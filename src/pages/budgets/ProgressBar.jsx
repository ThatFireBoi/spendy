import React from "react";

export const ProgressBar = ({ currentAmount, targetAmount }) => {
    const progress = Math.min((currentAmount / targetAmount) * 100, 100); // Calculate progress percentage

    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0de', borderRadius: '8px' }}>
            <div 
                style={{ 
                    width: `${progress}%`, 
                    backgroundColor: progress === 100 ? '#4caf50' : '#2196f3',
                    textAlign: 'center',
                    borderRadius: '8px',
                    padding: '4px 0',
                    color: 'black',
                    transition: 'width 0.5s ease-in-out'
                }}
            >
                {progress.toFixed(2)}%
            </div>
        </div>
    );
};
