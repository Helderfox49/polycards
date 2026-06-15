import React from 'react';

function Flashcard({ front, back, isFlipped, onFlip }) {
    return (
        <div className="flashcard-container" onClick={onFlip}>
            <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* RECTO : Question */}
                <div className="card-face card-front">
                    <div style={{ width: '100%' }}>
                        <small style={{ color: '#007bff', fontWeight: 'bold', letterSpacing: '1px' }}> RECTO ❓(QUESTION)</small>
                        <p style={{ whiteSpace: 'pre-line', marginTop: '20px', lineHeight: '1.6' }}>{front}</p>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '25px' }}> Cliquez sur la carte 💡pour vérifier</p>
                    </div>
                </div>
                {/* VERSO : Réponse */}
                <div className="card-face card-back">
                    <div style={{ width: '100%' }}>
                        <small style={{ color: '#28a745', fontWeight: 'bold', letterSpacing: '1px' }}> VERSO ✅(RÉPONSE)</small>
                        <p style={{ whiteSpace: 'pre-line', marginTop: '20px', lineHeight: '1.6', color: '#155724' }}>{back}</p>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '25px' }}>Cliquez pour revoir laquestion</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Flashcard;