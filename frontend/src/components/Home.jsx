import React from 'react';

import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';
import { Layers, BookOpen, RotateCcw, CheckCircle } from 'lucide-react';

export default function Home() {
    const { isSignedIn } = useUser();

    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <div className="min-h-screen bg-slate-50">

            {/* HERO SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                    PolyCards
                </h1>

                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Une plateforme simple et efficace pour apprendre les concepts techniques
                    grâce aux flashcards et à la répétition active.
                </p>

                <div className="mt-8 flex gap-4 justify-center">
                    <Link to="/dashboard">
                        <Button className="text-white bg-indigo-600 hover:bg-indigo-700">
                            Commencer
                        </Button>
                    </Link>

                    <Link to="/sign-in">
                        <Button variant="outline">
                            Se connecter
                        </Button>
                    </Link>
                </div>
            </section>

            {/* DESCRIPTION */}
            <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Apprenez plus vite, retenez mieux
                    </h2>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                        L’apprentissage de concepts techniques complexes (Docker, React, réseaux, mathématiques)
                        repose sur la répétition et la pratique. PolyCards simplifie ce processus en vous permettant
                        de créer des paquets de cartes et de réviser efficacement.
                    </p>

                    <ul className="mt-6 space-y-2 text-slate-700">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Création de decks thématiques
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Cartes recto / verso interactives
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Mode révision fluide
                        </li>
                    </ul>
                </div>

                <div className="grid gap-4">
                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Layers className="text-indigo-600" />
                            <span>Création de Decks (Docker, React, Réseau...)</span>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex items-center gap-3">
                            <BookOpen className="text-green-600" />
                            <span>Ajout de cartes (Question / Réponse)</span>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex items-center gap-3">
                            <RotateCcw className="text-blue-600" />
                            <span>Mode révision interactif</span>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* USER STORIES */}
            <section className="bg-white border-t py-16">
                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center text-slate-900">
                        Fonctionnalités principales
                    </h2>

                    <div className="mt-10 grid md:grid-cols-2 gap-8">

                        <Card className="shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg">📦 Gestion des Decks</h3>
                                <p className="text-slate-600 mt-2 text-sm">
                                    Créez des paquets thématiques (ex : Docker, React, Maths).
                                    Consultez tous vos decks depuis la page principale.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg">🃏 Gestion des Cartes</h3>
                                <p className="text-slate-600 mt-2 text-sm">
                                    Ajoutez des cartes avec un recto (question) et un verso (réponse).
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg">🎯 Mode Révision</h3>
                                <p className="text-slate-600 mt-2 text-sm">
                                    Retournez les cartes, révisez et progressez efficacement.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg">🏁 Fin de session</h3>
                                <p className="text-slate-600 mt-2 text-sm">
                                    Un écran de fin vous félicite après chaque session de révision.
                                </p>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-16 bg-slate-50 border-t">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold text-slate-900">
                        Équipe du projet
                    </h2>

                    <p className="text-slate-600 mt-2">
                        Projet réalisé par une équipe de 5 développeurs
                    </p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">

                        {[
                            "BARKA EBEN-EZEER",
                            "DIDDI KOULSOUMI",
                            "MOUHAMADOU ALY IMRANA",
                            "MBOTTO GUY ROBERT ULRICH",
                            "OUMAROU HAMIDOU",
                        ].map((member, i) => (
                            <Card key={i} className="shadow-sm">
                                <CardContent className="p-4">
                                    <div className="w-10 h-10 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="mt-3 text-sm font-medium text-slate-700">
                                        {member}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}

                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-16 text-center bg-indigo-600 text-white">
                <h2 className="text-3xl font-bold">
                    Prêt à commencer à apprendre ?
                </h2>

                <p className="mt-2 text-indigo-100">
                    Crée tes premiers decks et commence à réviser efficacement dès maintenant.
                </p>

                <Link to="/dashboard">
                    <Button className="mt-6 bg-white text-indigo-600 hover:bg-slate-100">
                        Accéder à PolyCards
                    </Button>
                </Link>
            </section>

        </div>
    );
}