import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
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

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-50 flex flex-col">

                <Navbar />

                <main className="flex-grow">
                    <Routes>

                        {/* HOME */}
                        <Route
                            path="/"
                            element={
                                <>
                                    <SignedIn>
                                        <Navigate to="/dashboard" replace />
                                    </SignedIn>

                                    <SignedOut>
                                        <Home />
                                    </SignedOut>
                                </>
                            }
                        />

                        {/* AUTH PAGES */}
                        <Route path="/sign-in/*" element={<SignInPage />} />
                        <Route path="/sign-up/*" element={<SignUpPage />} />

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
    );
}

export default App;