import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                appearance={{
                    elements: {
                        card: "shadow-xl border border-slate-200",
                    },
                }}
            />
        </div>
    );
}