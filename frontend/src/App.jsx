import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
} from '@clerk/clerk-react';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DeckDetails from './components/DeckManager';
import StudySession from './components/StudySession';
import Navbar from './components/Navbar';

import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
    throw new Error('La clé publique Clerk est manquante.');
}

function App() {
    return (
        <ClerkProvider
            publishableKey={clerkPublishableKey}
            appearance={{
                variables: {
                    colorPrimary: '#4f46e5',
                },
                elements: {
                    card: 'shadow-xl border border-slate-200',
                    formButtonPrimary:
                        'bg-indigo-600 hover:bg-indigo-700 text-white',
                    footerActionLink:
                        'text-indigo-600 hover:text-indigo-700',
                },
            }}
        >
            <BrowserRouter>
                <div className="min-h-screen bg-slate-50 flex flex-col">
                    <Navbar />

                    <main className="flex-grow">
                        <Routes>
                            {/* HOME PAGE */}
                            <Route path="/" element={<Home />} />

                            {/* AUTH */}
                            <Route
                                path="/sign-in/*"
                                element={<SignInPage />}
                            />

                            <Route
                                path="/sign-up/*"
                                element={<SignUpPage />}
                            />

                            {/* DASHBOARD */}
                            <Route
                                path="/dashboard"
                                element={
                                    <>
                                        <SignedIn>
                                            <Dashboard />
                                        </SignedIn>

                                        <SignedOut>
                                            <Navigate to="/sign-in" replace />
                                        </SignedOut>
                                    </>
                                }
                            />

                            {/* DECK DETAILS */}
                            <Route
                                path="/decks/:deckId"
                                element={
                                    <>
                                        <SignedIn>
                                            <DeckDetails />
                                        </SignedIn>

                                        <SignedOut>
                                            <Navigate to="/sign-in" replace />
                                        </SignedOut>
                                    </>
                                }
                            />

                            {/* STUDY */}
                            <Route
                                path="/study/:deckId"
                                element={
                                    <>
                                        <SignedIn>
                                            <StudySession />
                                        </SignedIn>

                                        <SignedOut>
                                            <Navigate to="/sign-in" replace />
                                        </SignedOut>
                                    </>
                                }
                            />

                            {/* FALLBACK */}
                            <Route
                                path="*"
                                element={<Navigate to="/dashboard" replace />}
                            />

                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </ClerkProvider>
    );
}

export default App;