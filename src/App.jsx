import React from "react";
import { useState, useEffect } from "react";
import Scoreboard from "./Components/GameBoard.jsx";
import Card from "./Components/Card.jsx";
import MyModal from "./Components/Modal.jsx"
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]); // new cards 
  const [score, setScore] = useState(0); // to increment user's scores
  const [bestScore, setBestScore] = useState(0); // high score
  const [clickedCards, setClickedCards] = useState([]); // to save the cards that has already been clicked
  const LIMIT = 21;
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`; // url to fetch our cards from the Pokemon API

  useEffect(() => {
    //Fetch data from API
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const cardData = data.results.map((item, index) => ({
          id: index,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
            }.png`,
        }));

        setCards(shuffleArray(cardData)); // each time a user clicks a card, the cards shuffles randomly
      })
      .catch((err) => console.log(`Error fetching data: ${err}`));
  }, []);

  //Shuffling the Card Array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //Handling Card Clicks
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      //Reset if the same card is clicked again
      alert('You already chose this card! Try again');
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    //Shuffle cards
    setCards(shuffleArray(cards));
  };
  return (
    <>
      <div className="app">
        <MyModal />
        <Scoreboard score={score} bestScore={bestScore} />
        <div className="card-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
