import React, { useState } from "react";
import Die from "./Die.jsx";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    updateWindowDimension();
    //
    window.addEventListener("resize", updateWindowDimension);
    //
    return () => {
      window.removeEventListener("resize", updateWindowDimension);
    };
  }, []);

  React.useEffect(
    function () {
      const allHeld = dice.every((die) => die.isHeld);
      const allSameValue = dice.every((die) => die.value === dice[0].value);
      if (allHeld && allSameValue) {
        setTenzies(true);
        console.log("Tenzies");
      }
    },
    [dice]
  );

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldObject) =>
        oldObject.map((notHelded) => {
          return !notHelded.isHeld
            ? {
                ...oldObject,
                value: Math.ceil(Math.random() * 6),
                id: nanoid(),
              }
            : notHelded;
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldObject) =>
      oldObject.map((matchId) => {
        return matchId.id === id
          ? { ...matchId, isHeld: !matchId.isHeld }
          : matchId;
      })
    );
  }

  const dieElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleClick={() => holdDice(die.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && (
        <Confetti
          height={windowDimension.height}
          width={windowDimension.width}
        />
      )}
      <div className="head">
        <h1>Tenzies</h1>
        <h2>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </h2>
      </div>
      <div className="die-container">{dieElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}
