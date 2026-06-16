import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App.jsx';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
    throw new Error("Clerk key manquante");
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={clerkPublishableKey}
            appearance={{
                variables: {
                    colorPrimary: '#4f46e5',
                },
                elements: {
                    card: 'shadow-xl border border-slate-200',
                    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
                    footerActionLink: 'text-indigo-600 hover:text-indigo-700',
                },
            }}
        >
            <App />
        </ClerkProvider>
    </StrictMode>
);