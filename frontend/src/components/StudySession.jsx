import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Button } from './ui/button';
import Flashcard from './FlashCard'; 
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Award, BookOpen } from 'lucide-react';

export default function StudySession() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    
    // États de données
    const [cards, setCards] = useState([]);
    const [deckTitle, setDeckTitle] = useState(''); // État pour savoir dans quel paquet on se trouve
    const [isLoading, setIsLoading] = useState(true);
    
    // Machine à états de la session
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [cardEvaluations, setCardEvaluations] = useState({});

    // Chargement conjoint du nom du paquet et des cartes associées
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const token = await getToken();
                
                // 1. Récupération des informations du paquet (pour le nom)
                const deckResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const deckResult = await deckResponse.json();
                if (deckResult.success) {
                    setDeckTitle(deckResult.data.title);
                }

                // 2. Récupération des fiches mémoires
                const cardsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const cardsResult = await cardsResponse.json();
                if (cardsResult.success) {
                    setCards(cardsResult.data);
                }
            } catch (error) {
                console.error("Erreur de chargement de la session :", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessionData();
    }, [deckId]);

    const changeCardIndex = (newIndex) => {
        setIsFlipped(false); // Règle stricte : retour à la face Question
        setTimeout(() => {
            setCurrentIndex(newIndex);
        }, 150);
    };

    const handleNextCard = () => {
        if (currentIndex < cards.length - 1) changeCardIndex(currentIndex + 1);
    };

    const handlePreviousCard = () => {
        if (currentIndex > 0) changeCardIndex(currentIndex - 1);
    };

    const evaluateCurrentCard = (isKnown) => {
        setCardEvaluations(prev => ({
            ...prev,
            [cards[currentIndex]._id]: isKnown ? 'known' : 'unknown'
        }));
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setCardEvaluations({});
        setIsFinished(false);
    };

    if (isLoading) return <div className="text-center p-12 mt-10 text-slate-500">Préparation de votre espace d'étude...</div>;

    if (!cards || cards.length === 0) {
        return (
            <div className="container mx-auto p-6 max-w-2xl text-center mt-10">
                <div className="bg-amber-50 border border-amber-200 p-10 rounded-xl">
                    <h2 className="text-2xl font-bold text-amber-800 mb-2">Paquet vide</h2>
                    <p className="text-amber-700 mb-6">Vous devez ajouter des fiches à ce paquet avant de pouvoir réviser.</p>
                    <Button onClick={() => navigate(`/decks/${deckId}`)}>Aller gérer ce paquet</Button>
                </div>
            </div>
        );
    }

    // ÉCRAN DE BILAN FINAL
    if (isFinished) {
        const totalCards = cards.length;
        const known = Object.values(cardEvaluations).filter(v => v === 'known').length;
        const unknown = totalCards - known;
        const percentage = Math.round((known / totalCards) * 100);
        
        return (
            <div className="container mx-auto p-6 max-w-xl text-center mt-10">
                <div className="bg-white border p-10 rounded-2xl shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                        <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Session Terminée ! 🎉</h2>
                    
                   
                    <p className="text-lg font-semibold text-slate-700 mb-6">
                        Bravo, vous avez révisé <span className="text-indigo-600 font-extrabold">{totalCards}</span> {totalCards > 1 ? 'cartes' : 'carte'} !
                    </p>
                    
                    <div className="flex justify-center gap-12 mb-8 w-full border-y py-4 bg-slate-50 rounded-xl">
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-green-500">{known}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Maîtrisées</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-red-500">{unknown}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">À revoir</span>
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
                        <div className="bg-indigo-600 h-3 transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <Button className="w-1/2" variant="outline" onClick={() => navigate('/dashboard')}>Tableau de bord</Button>
                        <Button className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleRestart}>Recommencer</Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentCardStatus = cardEvaluations[cards[currentIndex]._id];

    return (
        <div className="container mx-auto p-6 max-w-2xl flex flex-col items-center mt-4">
            
            {/* EN-TÊTE CONTEXTUEL (Affiche le nom du paquet courant) */}
            <div className="w-full flex flex-col gap-2 mb-6 pb-4 border-b">
                <div className="flex justify-between items-center">
                    <Link to={`/decks/${deckId}`} className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors">
                        ⬅ Retour à la gestion
                    </Link>
                    <span className="text-xs font-bold bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 border border-indigo-100">
                        Fiche {currentIndex + 1} / {cards.length}
                    </span>
                </div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-1">
                    <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    En cours de révision : <span className="text-indigo-600 font-semibold">{deckTitle || "Chargement..."}</span>
                </h2>
            </div>

            {/* RENDER DE LA FLASHCARD 3D */}
            <Flashcard 
                front={cards[currentIndex].front}
                back={cards[currentIndex].back}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
            />

            {/* AUTO-ÉVALUATION INLINE */}
            <div className={`mt-6 flex flex-col items-center gap-2 w-full transition-all duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Votre diagnostic :</p>
                <div className="flex gap-4">
                    <Button 
                        variant={currentCardStatus === 'unknown' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => evaluateCurrentCard(false)}
                        className="flex items-center gap-1"
                    >
                        <XCircle className="w-4 h-4" /> Mauvaise réponse
                    </Button>
                    <Button 
                        variant={currentCardStatus === 'known' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => evaluateCurrentCard(true)}
                        className={currentCardStatus === 'known' ? 'bg-green-600 hover:bg-green-700 text-white flex items-center gap-1' : 'flex items-center gap-1 text-green-600 hover:text-green-700'}
                    >
                        <CheckCircle2 className="w-4 h-4" /> Bonne réponse !
                    </Button>
                </div>
            </div>

            {/* BARRE DE NAVIGATION INFÉRIEURE : COULEURS AJUSTÉES */}
            <div className="mt-10 pt-4 border-t w-full flex justify-between items-center">
                
                {/* Bouton Précédent */}
                <Button
                    onClick={handlePreviousCard}
                    disabled={currentIndex === 0}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-2 font-medium disabled:opacity-40 disabled:hover:bg-slate-100"
                >
                    <ArrowLeft className="w-4 h-4" /> Carte précédente
                </Button>

                {/* Bouton Suivant / Finition */}
                {currentIndex === cards.length - 1 ? (
                    <Button
                        onClick={() => setIsFinished(true)}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-md font-semibold flex items-center gap-2 transition-transform hover:scale-105"
                    >
                        Terminer & Voir le bilan
                    </Button>
                ) : (
                    <Button
                        onClick={handleNextCard}
                        disabled={currentIndex === cards.length - 1}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm flex items-center gap-2 font-medium disabled:opacity-40"
                    >
                        Carte suivante <ArrowRight className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}