import React, { useEffect, useState } from 'react';
import getGifs from '../Components/GiphyService';
import Card from '../Components/Card';

const GameBoard = () => {
    const [gifs, setGifs] = useState([]);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        // Fetch GIFs and duplicate them for matching
        const loadGifs = async () => {
            const fetchedGifs = await getGifs();
            const duplicatedCards = [...fetchedGifs, ...fetchedGifs] // Duplicate for pairs
                .sort(() => Math.random() - 0.5) // Shuffle
                .map((gif, index) => ({ ...gif, uniqueId: index, isFlipped: false }));

            setCards(duplicatedCards);
            setGifs(fetchedGifs);
        };

        loadGifs();
    }, []);

    const handleCardClick = (clickedCard) => {
        if (flippedCards.length === 2 || clickedCard.isFlipped) return;

        const updatedCards = cards.map((card) =>
            card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
        );

        setCards(updatedCards);
        setFlippedCards((prev) => [...prev, clickedCard]);

        if (flippedCards.length === 1) {
            checkMatch(flippedCards[0], clickedCard, updatedCards);
        }
    };

    const checkMatch = (card1, card2, updatedCards) => {
        if (card1.id === card2.id) {
            setScore((prev) => prev + 1);
            setHighScore((prev) => prev + 1);
            setFlippedCards([]);
        } else {
            setTimeout(() => {
                const resetCards = updatedCards.map((card) =>
                    card.uniqueId === card1.uniqueId || card.uniqueId === card2.uniqueId
                        ? { ...card, isFlipped: false }
                        : card
                );
                setCards(resetCards);
                setFlippedCards([]);
            }, 1000);
        }
    };

    return (
        <div className="game-board">
            <h1>Memory Card Game</h1>
            <div>
            <p>Score: {score}</p>
            <p>High Score: {score}</p>
            </div>
            <div className="card-grid">
                {cards.map((card) => (
                    <Card
                        key={card.uniqueId}
                        gif={card}
                        isFlipped={card.isFlipped}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
