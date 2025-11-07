import Player from "../players/player";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/material/styles";

function PlayerSetUp() {
  const navigate = useNavigate();
  const p1 = useRef(new Player("", 8000));
  const p2 = useRef(new Player("", 8000));

  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");

  const [firstTurn, setFirstTurn] = useState(null);
  const [rolled ,setRolled] = useState(false);

  const setNameP1 = (e) => {
    p1.current.setName(e.target.value);
    setP1Name(p1.current.name);
  };

  const setNameP2 = (e) => {
    p2.current.setName(e.target.value);
    setP2Name(p2.current.name);
  };

  const startDuel = () => {
    if (!p1Name || !p2Name) {
      alert("Enter both player names first!");
      return;
    }
      if (!rolled)
    {
      alert("A roll needs to be done");
      return;
    }
    navigate("/duel-page", { state: { p1: p1.current, p2: p2.current, firstTurn : firstTurn} });
  };

  const roll = () =>
  {
    if (!p1Name || !p2Name)
    {
      alert("Enter both player names first!");
      return;
    }
  

    const result = Math.floor(Math.random() * 2) + 1;
    setFirstTurn(result);
    setRolled(true);
    console.log(result +  " was rolled" )
  }


  return (
    <div className="bg-blue-400 min-h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold mb-4">Set Up Players</h1>
      <div className="flex flex-row justify-center gap-2">
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-bold">Player 1</label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Name"
            onChange={setNameP1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label  className="font-bold">Player 2</label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Name"
            onChange={setNameP2}
          />
        </div>
      </div>
{!rolled ? (
  <Button
    className="!bg-blue-200 hover:!bg-blue-300 !text-black"
    onClick={roll}
  >
    Roll First Turn
  </Button>
) : (
  <h2 className="text-lg font-semibold">
    {firstTurn === 1 ? `${p1.current.name} goes first!` : `${p2.current.name} goes first!`}
  </h2>
)}
      
      <Button
        className="!bg-blue-200 hover:!bg-blue-300"
        onClick={startDuel}
      >
        Start
      </Button>
    </div>
  );
}

export default PlayerSetUp;
