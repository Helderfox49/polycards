// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FolderPlus } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [decks, setDecks] = useState([]);

    // Formulaire création
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [loadingId, setLoadingId] = useState(null);

    // Récupération des decks
    const fetchDecks = async () => {
        try {
            const token = await getToken();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const result = await response.json();

            if (result.success) setDecks(result.data);
        } catch (error) {
            console.error("Erreur récupération decks :", error);
        }
    };

    useEffect(() => {
        fetchDecks();
    }, []);

    // Création deck
    const handleCreateDeck = async (e) => {
        e.preventDefault();

        try {
            const token = await getToken();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, description })
            });

            const result = await response.json();

            if (result.success) {
                setDecks(prev => [result.data, ...prev]);
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error("Erreur création deck :", error);
        }
    };

    // Suppression deck
    const handleDeleteDeck = async (deckId) => {
        if (!window.confirm("Supprimer ce paquet ?")) return;

        try {
            setLoadingId(deckId);

            const token = await getToken();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            const result = await response.json();

            if (result.success) {
                setDecks(prev => prev.filter(deck => deck._id !== deckId));
            }
        } catch (error) {
            console.error("Erreur suppression deck :", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-slate-900">Mon Espace d'Étude</h1>

            {/* FORM CREATE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {/* <FolderPlus className="w-5 h-5 text-blue-600" /> */}
                    Créer un nouveau paquet
                </h3>

                <form onSubmit={handleCreateDeck} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block text-slate-600">Nom du paquet</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Réseau - DNS"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block text-slate-600">Description</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description du paquet..."
                            rows={2}
                        />
                    </div>

                    <Button type="submit" className="w-full md:w-40 self-end">
                        Créer le paquet
                    </Button>
                </form>
            </div>

            <h2 className="text-xl font-bold mb-4 text-slate-900">Mes Paquets</h2>

            {/* AFFICHAGE DES CARDS */}
            {Array.isArray(decks) && decks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {decks.map((deck) => (
                        <div key={deck._id} className="p-5 border rounded-xl shadow-sm bg-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-800">{deck.title}</h3>
                                <p className="text-slate-600 mt-2 text-sm line-clamp-2">{deck.description || "Aucune description."}</p>
                            </div>
                            <div className="mt-6 flex gap-2 justify-between items-center">
                                <div className="flex gap-2">
                                    <Link to={`/decks/${deck._id}`} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors">
                                        Gérer
                                    </Link>
                                    <Link to={`/study/${deck._id}`} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition-colors">
                                        Réviser
                                    </Link>
                                </div>
                                <button 
                                    onClick={() => handleDeleteDeck(deck._id)} 
                                    className="text-xs text-red-500 hover:text-red-700 font-medium p-2"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-lg text-slate-600 font-medium">Pas de paquet (deck) disponible pour le moment.</p>
                    <p className="text-sm text-slate-400 mt-1">Utilisez le formulaire ci-dessus pour initialiser votre premier espace.</p>
                </div>
            )}
        </div>
    );
}