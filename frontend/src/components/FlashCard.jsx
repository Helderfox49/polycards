import React from 'react';

export default function Flashcard({ front, back, isFlipped, onFlip }) {
    return (
        <div 
            className="w-full h-80 cursor-pointer group perspective-[1000px]"
            onClick={onFlip}
        >
            {/* Conteneur de rotation animé par la prop isFlipped */}
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* FACE AVANT : Question */}
                <div className="absolute inset-0 bg-white border-2 border-blue-100 rounded-2xl shadow-md p-8 flex flex-col justify-center items-center text-center [backface-visibility:hidden]">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">Question</span>
                    <h3 className="text-2xl font-medium text-slate-800 break-words w-full px-4">{front}</h3>
                    <p className="absolute bottom-6 text-xs text-slate-400 animate-pulse">Cliquez pour révéler la réponse</p>
                </div>

                {/* FACE ARRIÈRE : Réponse (Compatible longs textes et HTML issu du Textarea) */}
                <div className="absolute inset-0 bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-md p-8 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-4">Réponse</span>
                    
                    {/* Rendu HTML dynamique */}
                    <div 
                        className="text-xl font-medium text-slate-800 max-w-full break-words prose whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: back }} 
                    />
                </div>

            </div>
        </div>
    );
}