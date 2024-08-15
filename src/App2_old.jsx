// you have a game like tictactoe, but the 2 players have each 9 tokens
//  in 3 different sizes. 3 of size 1, 3 of size 2 and 3 of size 3. player 1 
//  has the color orange, player 2 the color 2. the token can be placed by 
//  the player in every cell of the nine fields, if the cell is empty or the
//   value of the token is higher than the token already in the cell. winner 
//   is the player who has 3 token of his color in horizontal, vertical or 
//   diagonal. design this game and its logic.

import React, { useState, useEffect } from 'react';

const PLAYER_1 = { name: 'Player 1', color: 'orange' };
const PLAYER_2 = { name: 'Player 2', color: 'blue' };

const initialTokens = {
  [PLAYER_1.name]: { 1: 3, 2: 3, 3: 3 },
  [PLAYER_2.name]: { 1: 3, 2: 3, 3: 3 },
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [selectedSize, setSelectedSize] = useState(1);
  const [tokens, setTokens] = useState(initialTokens);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[b] && board[c] &&
        board[a].player === board[b].player &&
        board[a].player === board[c].player) {
        return board[a].player;
      }
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (winner || !tokens[currentPlayer.name][selectedSize]) return;

    const newBoard = [...board];
    if (!newBoard[index] || newBoard[index].size < selectedSize) {
      newBoard[index] = { player: currentPlayer, size: selectedSize };
      setBoard(newBoard);

      const newTokens = { ...tokens };
      newTokens[currentPlayer.name][selectedSize]--;
      setTokens(newTokens);

      setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
      setSelectedSize(1);
    }
  };

  useEffect(() => {
    const newWinner = checkWinner(board);
    if (newWinner) setWinner(newWinner);
  }, [board]);

  const renderCell = (index) => {
    const cell = board[index];
    return (
      <div
        className={`w-20 h-20 border border-gray-400 flex items-center justify-center cursor-pointer`}
        onClick={() => handleCellClick(index)}
      >
        {cell && (
          <div
            className={`rounded-full`}
            style={{
              backgroundColor: cell.player.color,
              width: `${cell.size * 20}px`,
              height: `${cell.size * 20}px`,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Advanced Tic-Tac-Toe</h1>
      {/* <div className="mb-4">
        <p>Current Player: {currentPlayer.name}</p>
        <p>Selected Size: {selectedSize}</p>
      </div> */}
      <div className="mb-4">
        <p className="text-xl font-semibold">
          Next Player:
          <span
            className="ml-2 px-3 py-1 rounded"
            style={{
              backgroundColor: currentPlayer.color,
              color: currentPlayer.color === 'orange' ? 'black' : 'white'
            }}
          >
            {currentPlayer.name}
          </span>
        </p>
        <p>Selected Size: {selectedSize}</p>
      </div>

      <div className="mb-4">
        {[1, 2, 3].map(size => (
          <button
            key={size}
            className={`mx-2 px-4 py-2 rounded ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedSize(size)}
            disabled={tokens[currentPlayer.name][size] === 0}
          >
            Size {size} ({tokens[currentPlayer.name][size]} left)
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner && <p className="text-2xl font-bold">{winner.name} wins!</p>}
    </div>
  );
};

export default App;
