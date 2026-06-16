import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

import { Pencil, Trash2, X, Check } from 'lucide-react'; 

export default function DeckDetails() {
    const { deckId } = useParams();
    const { getToken } = useAuth();
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState(null);
    
    // Formulaire d'ajout
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

    // Gestion de la modification inline
    const [editingCardId, setEditingCardId] = useState(null);
    const [editFront, setEditFront] = useState('');
    const [editBack, setEditBack] = useState('');

    //Récupérer le paquet courant
    const fetchDeck = async () => {
      try {
          const token = await getToken();

          const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/decks/${deckId}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }
          );

          const result = await response.json();

          if (result.success) {
              setDeck(result.data);
          }
      } catch (error) {
          console.error("Erreur récupération deck :", error);
      }
  };

    const fetchCards = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) setCards(result.data);
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    useEffect(() => {
        fetchDeck();
        fetchCards();
    }, [deckId]);

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ front: newFront, back: newBack })
            });
            const result = await response.json();
            if (result.success) {
                setNewFront('');
                setNewBack('');
                fetchCards();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (!window.confirm("Supprimer définitivement cette fiche ?")) return;
        try {
            const token = await getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards/${cardId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) fetchCards();
        } catch (error) {
            console.error(error);
        }
    };

    const startEditing = (card) => {
        setEditingCardId(card._id);
        setEditFront(card.front);
        setEditBack(card.back);
    };

    const handleUpdateCard = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards/${editingCardId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ front: editFront, back: editBack })
            });
            const result = await response.json();
            if (result.success) {
                setEditingCardId(null);
                fetchCards();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
        {/* EN-TÊTE AVEC BOUTON DE NAVIGATION DIRECTE VERS LA RÉVISION */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
                <Link to="/dashboard" className="text-sm text-blue-600 hover:underline inline-block">
                    ⬅ Retour au dashboard
                </Link>
                
                {/* BOUTON DE RÉVISION DIRECTE DU PAQUET */}
                <Link to={`/study/${deckId}`}>
                    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-md font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Réviser ce paquet
                    </Button>
                </Link>
            </div>
            
            {/* FORMULAIRE DE CRÉATION FLUIDE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Ajouter une fiche mémoire</h3>
                <form onSubmit={handleAddCard} className="flex flex-col gap-4">
                    
                    {/* Conteneur global des champs forcé en colonne (sous forme de pile) */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block text-slate-600">Question :</label>
                            <Input 
                                value={newFront} 
                                onChange={(e) => setNewFront(e.target.value)} 
                                placeholder="Ex: Rôle du protocole DNS ?" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block text-slate-600">Réponse :</label>
                            <Textarea 
                                value={newBack} 
                                onChange={(e) => setNewBack(e.target.value)} 
                                placeholder="Ex: Résout les noms de domaine en adresses IP." 
                                rows={5} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Bouton aligné à droite en fin de pile */}
                    <Button type="submit" className="w-full md:w-32 self-end mt-2">Ajouter</Button>
                </form>
            </div>

            <div className="mb-4">
            <h2 className="text-xl font-bold mb-4 text-slate-900">
                Contenu du paquet :
                <span className="text-indigo-600 ml-2">
                    {deck?.title}
                </span>
                <span className="text-sm font-normal text-slate-500 ml-3">
                    ({cards.length} carte{cards.length > 1 ? 's' : ''})
                </span>
            </h2>
          </div>

            {/* LISTE DES CARTES ALIGNÉES VERTICALEMENT (VÉRIFICATION STRICTE) */}
            {Array.isArray(cards) && cards.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {cards.map((card, idx) => (
                        <div key={card._id} className="relative p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                            
                            {/* ÉTAT : MODE ÉDITION EN STATS VERTICALES */}
                            {editingCardId === card._id ? (
                                <form onSubmit={handleUpdateCard} className="w-full flex flex-col gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Recto (Question)</label>
                                        <Input value={editFront} onChange={(e) => setEditFront(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Verso (Réponse)</label>
                                        <Textarea value={editBack} onChange={(e) => setEditBack(e.target.value)} rows={5} required />
                                    </div>
                                    <div className="flex gap-2 justify-end mt-1">
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setEditingCardId(null)} className="text-slate-500">
                                            <X className="w-4 h-4 mr-1" /> Annuler
                                        </Button>
                                        <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                            <Check className="w-4 h-4 mr-1" /> Enregistrer
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                // ÉTAT : MODE LECTURE STRUCTURÉ VERTICALEMENT
                                <>
                                    {/* Barre d'action d'icônes ergonomiques en haut à droite */}
                                    <div className="absolute top-4 right-4 flex gap-1">
                                        <button 
                                            onClick={() => startEditing(card)} 
                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            title="Modifier cette carte"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteCard(card._id)} 
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Supprimer cette carte"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Bloc Contenu Vertical */}
                                    <div className="pr-20"> {/* pr-20 évite que le texte passe sous les icônes à droite */}
                                        <span className="text-xs font-bold text-slate-400 uppercase">Fiche #{idx + 1}</span>
                                        
                                        {/* RECTO */}
                                        <div className="mt-1">
                                            <p className="text-xs font-semibold text-slate-400">RECTO / QUESTION</p>
                                            <p className="font-medium text-slate-800 text-base">{card.front}</p>
                                        </div>
                                        
                                        {/* VERSO (Plus large, fond coloré structurant) */}
                                        <div className="mt-3">
                                            <p className="text-xs font-semibold text-green-600 mb-1">VERSO / RÉPONSE</p>
                                            <div className="text-sm text-slate-700 border-l-4 border-green-400 pl-3 py-2 bg-slate-50 rounded-r-lg break-words whitespace-pre-line">
                                                <div dangerouslySetInnerHTML={{ __html: card.back }} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-slate-50 text-slate-400 rounded-xl border border-dashed border-slate-300">
                    <p className="font-medium text-slate-600">Aucune fiche mémoire dans ce paquet.</p>
                    <p className="text-xs mt-1">Utilisez le panneau supérieur pour alimenter votre espace d'étude.</p>
                </div>
            )}
        </div>
    );
}