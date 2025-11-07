import { useEffect, useState } from "react";

function History() {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/duels")
      .then((res) => res.json())
      .then((data) => setDuels(data))
      .catch((err) => console.error("❌ Failed to load duel history:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#e3e6ff] flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Duel History</h1>

      {duels.length === 0 ? (
        <p className="text-gray-500">No duels recorded yet...</p>
      ) : (
        <table className="min-w-[60%] border border-gray-400 bg-white rounded-lg shadow-md">
          <thead className="bg-[#003399] text-white">
            <tr>
              <th className="py-2 px-4 border-b">Player 1</th>
              <th className="py-2 px-4 border-b">Player 2</th>
              <th className="py-2 px-4 border-b">Winner</th>
              <th className="py-2 px-4 border-b">Turns</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {duels.map((duel, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-b">{duel.player1}</td>
                <td className="py-2 px-4 border-b">{duel.player2}</td>
                <td
                  className={`py-2 px-4 border-b font-semibold ${
                    duel.winner === "Draw"
                      ? "text-gray-600"
                      : duel.winner === duel.player1
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {duel.winner}
                </td>
                <td className="py-2 px-4 border-b">{duel.turns}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(duel.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
