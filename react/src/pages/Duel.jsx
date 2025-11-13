;import '../styles/App.css';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Duel() {
  const [calcInput, setCalcInput] = useState('');
  const location = useLocation();
  const { p1, p2, firstTurn} = location.state || {};
  const [turnCount, setTurnCount] = useState(1);

  const [player1, setPlayer1] = useState(p1);
  const [player2, setPlayer2] = useState(p2);


  const [target, setTarget] = useState(0);
  const [targetName, setTargetName] = useState('');

  const [turnPlayer, setTurnPlayer] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState("");

  const [battleLog , setBattleLog] = useState("");
  const [completed, setCompleted] = useState(false);
  const [winner, setWinner] = useState("");

useEffect(() => {
  // only run once the duel data exists
  if (p1 && p2 && firstTurn != null) {
    if (firstTurn === 1) {
      setTurnPlayer(1);
      setCurrentPlayer(player1.name);
    } else {
      setTurnPlayer(2);
      setCurrentPlayer(player2.name);
    }
  }
}, [p1, p2, firstTurn]);

useEffect(() => {
  if (!completed) {
    if (player1.health <= 0) {
      setCompleted(true);
      dbHandler(player2.name);
      setWinner(player2.name);
    } else if (player2.health <= 0) {
      setCompleted(true);
      dbHandler(player1.name);
      setWinner(player1.name);
    }
  }
}, [player1.health, player2.health]);


//method to change turns
  const turnChange = () => {
  setTurnCount((prev) => prev + 1);
  setTurnPlayer((prev) => {
    const next = prev === 1 ? 2 : 1;
    setCurrentPlayer(next === 1 ? p1.name : p2.name);
    return next;
  });
};


    
  const addValue = (input) => {
    setCalcInput((prev) => prev + input.toString());
  };

  //method to take damage
const removeHealth = () => {
  const damage = Number(calcInput);
  if (!damage || target === 0) return;

  if (target === 1) {
    const newHealth = player1.health - damage;
    setPlayer1({ ...player1, health: newHealth });
  } else {
    const newHealth = player2.health - damage;
    setPlayer2({ ...player2, health: newHealth });
  }

 if(turnPlayer != target)
  {
    setBattleLog((prev) => prev + "\n" + targetName + " was attacked for " + calcInput + " by " + currentPlayer)
  }
  else
  {
    setBattleLog((prev) => prev + "\n" + targetName + " took " + calcInput + " from " + currentPlayer)
  }

  setCalcInput('');
};

//method to increase health
const increaseHealth = () => {
  const damage = Number(calcInput);
  if (!damage || target === 0) return;

  if (target === 1) {
    const newHealth = player1.health + damage;
    setPlayer1({ ...player1, health: newHealth });
  } else {
    const newHealth = player2.health + damage;
    setPlayer2({ ...player2, health: newHealth });
  }

  setBattleLog((prev) => prev + "\n" + currentPlayer + " gained " + calcInput)
  setCalcInput('');
};

//method to set the target player
 const setTargetPlayer = (e) => {
  setTarget(e);
  if (e === 1) {
    setTargetName(player1.name);
  } else {
    setTargetName(player2.name);
  }
};

//method to finish the game and then send data to the database
const dbHandler = async (winnerName) =>
{
  const duelData= {
    player1: player1.name,
    player2: player2.name,
    winner: winnerName,
    turns: turnCount,
  };

  try {
    await fetch("http://localhost:5000/api/duels", {method: "POST", 
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(duelData)
    });
  } catch (err)
  {
    console.error("Failed to save duel");
  }
}

 return (
  <div className="flex flex-col items-center justify-center w-full">
    {!completed ? (
      <>
        <h1 className="text-3xl font-bold mb-8">Duel</h1>
        <h2 className="font-bold">{currentPlayer}'s Turn</h2>
        <h2 className="font-bold">Turn Number: {turnCount}</h2>

        <div className="flex flex-row justify-between items-center gap-40 mb-6">
          <h1>
            <Button onClick={() => setTargetPlayer(1)}>{player1.name}</Button> LP:{player1.health}
          </h1>
          <h1>
            <Button onClick={() => setTargetPlayer(2)}>{player2.name}</Button> LP:{player2.health}
          </h1>
        </div>

        <Button
          variant="contained"
          color="primary"
          className="!mb-6 !px-8 !py-2 !rounded-lg"
          onClick={turnChange}
        >
          Next Turn
        </Button>

        <div className="flex flex-col items-center gap-3 w-full">
          <textarea
            value={calcInput}
            readOnly
            className="w-64 h-16 border border-gray-400 rounded-md p-2 text-right text-xl bg-white"
          />

          <div className="flex flex-row gap-2">
            <Button variant="outlined" onClick={() => addValue(7)}>7</Button>
            <Button variant="outlined" onClick={() => addValue(8)}>8</Button>
            <Button variant="outlined" onClick={() => addValue(9)}>9</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="outlined" onClick={() => addValue(4)}>4</Button>
            <Button variant="outlined" onClick={() => addValue(5)}>5</Button>
            <Button variant="outlined" onClick={() => addValue(6)}>6</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="outlined" onClick={() => addValue(1)}>1</Button>
            <Button variant="outlined" onClick={() => addValue(2)}>2</Button>
            <Button variant="outlined" onClick={() => addValue(3)}>3</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="outlined" onClick={() => addValue(0)}>0</Button>
            <Button variant="outlined" onClick={() => setCalcInput('')}>C</Button>
            <Button variant="contained" onClick={removeHealth}>-</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="contained">*</Button>
            <Button variant="contained" onClick={removeHealth}>/</Button>
            <Button variant="contained" onClick={increaseHealth}>+</Button>
          </div>

          <div className="mt-8 flex justify-center w-full">
            <textarea
              value={battleLog}
              readOnly
              style={{ whiteSpace: 'pre-line' }}
              className="w-[50vw] h-64 border border-gray-400 rounded-md p-3 text-left text-sm bg-white resize-none overflow-y-auto shadow-sm"
            />
          </div>
        </div>
      </>
    ) : (
      <div>
        <h1 className="text-4xl font-bold">Duel Completed</h1>
        <h2>{winner} is the winner!</h2>
      </div>
    )}
  </div>
);

}
export default Duel;
