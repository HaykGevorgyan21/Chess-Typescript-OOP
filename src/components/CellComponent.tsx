import React, { FC } from 'react'
import { Cell } from '../models/figures/Cell'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}
const CellComponent: FC<CellProps> = ({ cell: cell, selected, click }) => {
  return (
    <div className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{ background: cell.available && !cell.figure ? '' : '' }}
    >

      {cell.available && !cell.figure && <div className={'available'} />}
      {cell.figure?.logo && <img src={cell.figure.logo} />}
    </div>
  )
}

export default CellComponent
