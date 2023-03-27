import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/figures/Board';
import { Cell } from '../models/figures/Cell';
import { Colors } from '../models/figures/Colors';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;

}



const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null);
      updateBoard()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    hightlightCells()
  }, [selectedCell])

  function hightlightCells() {
    board.hightlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)

  }


  return (
    <div>
      <h3 className='name'>текущий игрок {currentPlayer?.color}</h3>
      <div className='board'>

        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(Cell =>
              <CellComponent cell={Cell} key={Cell.id}
                click={click}
                selected={Cell.x === selectedCell?.x && Cell.y === selectedCell?.y} />
            )}
          </React.Fragment>
        )}
      </div>

    </div>
  )
}

export default BoardComponent
