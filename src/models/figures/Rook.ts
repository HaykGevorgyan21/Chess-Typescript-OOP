import { Cell } from './Cell';
import { Colors } from "./colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';


export class rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        if (this.cell.isEmptyVerical(target))
            return true
        if (this.cell.isEmptyHorizonal(target))
            return true
        return false
    }
}