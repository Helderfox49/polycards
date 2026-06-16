import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Button } from './ui/button'; 
import { LogOut, User, Layers } from 'lucide-react';

export default function Navbar() {
    const { user } = useUser();       // Récupération de l'utilisateur connecté via Clerk
    const { signOut } = useClerk();   // Méthode de déconnexion native de Clerk
    const location = useLocation();

    // Détection des pages d'authentification pour adapter la Navbar
    // const isAuthPage = ['/login', '/register'].includes(location.pathname);
    const isAuthPage =
        location.pathname.startsWith('/sign-in') ||
        location.pathname.startsWith('/sign-up');

    // Extraction propre de l'identité de l'utilisateur (Prénom ou Nom Complet)
    const displayName =
        user?.firstName ||
        user?.fullName ||
        user?.primaryEmailAddress?.emailAddress ||
        "Utilisateur";

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                
                {/* GAUCHE : Logo & Nom de l'application */}
                <Link 
                    to={isAuthPage ? "/login" : "/dashboard"} 
                    className="flex items-center gap-2 group"
                >
                    <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
                        <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                        PolyCards
                    </span>
                </Link>

                {/* DROITE : Espace utilisateur s'adaptant à l'état de Clerk */}
                {!isAuthPage && user ? (
                    <div className="flex items-center gap-6">
                        
                        {/* Affichage du nom de l'utilisateur connecté */}
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                                {displayName}
                            </span>
                        </div>

                        {/* Bouton Déconnexion Clerk */}
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => signOut()} // Clerk vide la session et gère la sortie
                            className="text-slate-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Se déconnecter</span>
                        </Button>
                        
                    </div>
                ) : (
                    /* Contenu alternatif discret si sur l'écran d'authentification */
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest hidden sm:inline">
                        Espace de Révision Numérique
                    </span>
                )}

            </div>
        </nav>
    );
}