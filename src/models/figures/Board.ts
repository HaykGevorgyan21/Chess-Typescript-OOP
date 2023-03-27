import { rook } from './Rook';
import { kinght } from './Kinght';
import { king } from './King';
import { Bishop } from './Bishop';
import { Pawn } from './Pawn';
import { Queen } from './Queen';
import { Colors } from './colors';
import { Cell } from './Cell';
import { Figure } from './Figure';
export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []


    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []

            for (let j = 0; j < 8; j++) {

                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) //black 
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // white
                }

            }
            this.cells.push(row)
        }

    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard;
    }

    public hightlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }
    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))

        }
    }
    private addKings() {
        new king(Colors.BLACK, this.getCell(4, 0))
        new king(Colors.WHITE, this.getCell(4, 7))
    }
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }
    private addKinghts() {
        new kinght(Colors.BLACK, this.getCell(1, 0))
        new kinght(Colors.BLACK, this.getCell(6, 0))
        new kinght(Colors.WHITE, this.getCell(1, 7))
        new kinght(Colors.WHITE, this.getCell(6, 7))
    }
    private addRooks() {
        new rook(Colors.BLACK, this.getCell(0, 0))
        new rook(Colors.BLACK, this.getCell(7, 0))
        new rook(Colors.WHITE, this.getCell(0, 7))
        new rook(Colors.WHITE, this.getCell(7, 7))
    }

    // public addFisherFigures (){

    // }

    private addFigures() {
        this.addPawns()
        this.addKinghts()
        this.addKings()
        this.addBishops()
        this.addQueens()
        this.addRooks()
    }

}

