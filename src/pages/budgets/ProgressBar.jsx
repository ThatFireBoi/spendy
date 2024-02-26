import React from 'react';

export const ProgressBar = ({ currentAmount, targetAmount }) => {
    const progress = Math.min((currentAmount / targetAmount) * 100, 100); // Calculate progress percentage, capped at 100%

    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0de', borderRadius: '8px' }}>
            <div 
                style={{ 
                    width: `${progress}%`, 
                    backgroundColor: progress === 100 ? '#4caf50' : '#2196f3',
                    textAlign: 'right',
                    borderRadius: '8px',
                    padding: '4px 0',
                    color: 'white',
                    transition: 'width 0.5s ease-in-out'
                }}
            >
                {progress.toFixed(2)}%
            </div>
        </div>
    );
};
