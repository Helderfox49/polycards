import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="shadow-xl rounded-2xl overflow-hidden bg-white">
                <SignIn 
                    routing="path" 
                    path="/login" 
                    signUpUrl="/register" 
                    redirectUrl="/dashboard"
                />
            </div>
        </div>
    );
}