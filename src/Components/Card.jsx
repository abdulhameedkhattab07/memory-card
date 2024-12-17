import React from 'react';

const Card = ({ gif, isFlipped, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            {isFlipped ? (
                <img src={gif.url} alt="Memory card" />
            ) : (
                <div className="card-back">?</div>
            )}
        </div>
    );
};

export default Card;
