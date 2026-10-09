import { useState } from 'react'
import './App.css'
import Block from './components/Block'

type SquareValue = 'X' | 'O' | null

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board: SquareValue[]) {
  for (const [first, second, third] of winningCombinations) {
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return board[first]
    }
  }
  return null
}

function App() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const [hasQuit, setHasQuit] = useState(false)

  const winner = getWinner(board)
  const isDraw = !winner && board.every((square) => square !== null)
  const isGameOver = Boolean(winner) || isDraw

  const handleClick = (index: number) => {
    if (board[index] || isGameOver) return

    const nextBoard = [...board]
    nextBoard[index] = isXTurn ? 'X' : 'O'
    setBoard(nextBoard)
    setIsXTurn(!isXTurn)
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
    setHasQuit(false)
  }

  if (hasQuit) {
    return (
      <main className="game">
        <section className="game-panel" aria-live="polite">
          <h1>Thanks for playing!</h1>
          <button className="action-button" onClick={restartGame}>Play again</button>
        </section>
      </main>
    )
  }

  return (
    <main className="game">
      <section className="game-panel">
        <h1>Tic-Tac-Toe</h1>
        <p className="game-status" aria-live="polite">
          {winner ? `${winner} wins!` : isDraw ? "It's a draw!" : `${isXTurn ? 'X' : 'O'}'s turn`}
        </p>
        <div className="board" role="group" aria-label="Tic-Tac-Toe board">
          {[0, 1, 2].map((row) => (
            <div className="row" key={row}>
              {[0, 1, 2].map((column) => {
                const index = row * 3 + column
                return (
                  <Block
                    key={index}
                    value={board[index]}
                    onClick={() => handleClick(index)}
                    disabled={isGameOver || board[index] !== null}
                    label={`Row ${row + 1}, column ${column + 1}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
        {isGameOver && (
          <div className="game-actions">
            <button className="action-button" onClick={restartGame}>Restart</button>
            <button className="action-button secondary" onClick={() => setHasQuit(true)}>Quit</button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
