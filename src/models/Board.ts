import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Queen} from "./figures/Queen";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Rook} from "./figures/Rook";
import {Figure, FigureNames} from "./figures/Figure";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];


    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // чёрные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // белые
                }
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    }

    public highLightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public isCellEmpty(x: number, y: number) {
        return this.cells[y][x].isEmpty();
    }

    public doesCellHasFigure(x: number, y: number, figureName: FigureNames) {
        return this.cells[y][x].figure?.name === figureName;
    }

    public checkShortCastle(king: King, target: Cell): boolean {
        if (!king.hadAlreadyMoved
            && target.x === 6
            && this.isCellEmpty(5, king.cell.y)
            && this.isCellEmpty(6, king.cell.y)
            && this.doesCellHasFigure(7, king.cell.y, FigureNames.ROOK)
        ) {
            return true;
        }
        return  false;
    }

    public checkLongCastle(king: King, target: Cell): boolean {
        if (!king.hadAlreadyMoved
            && target.x === 2
            && this.isCellEmpty(1, king.cell.y)
            && this.isCellEmpty(2, king.cell.y)
            && this.isCellEmpty(3, king.cell.y)
            && this.doesCellHasFigure(0, king.cell.y, FigureNames.ROOK)
        ) {
            return true;
        }
        return  false;
    }

    public doShortCastle(king: King) {
        let rook = this.cells[king.cell.y][7].figure;
        if (rook === null)
            return;
        this.cells[rook.cell.y][rook.cell.x].moveFigure(this.cells[rook.cell.y][5]);
        this.cells[king.cell.y][king.cell.x].moveFigure(this.cells[king.cell.y][6]);
    }

    public doLongCastle(king: King) {
        let rook = this.cells[king.cell.y][0].figure;
        if (rook === null)
            return;
        this.cells[rook.cell.y][rook.cell.x].moveFigure(this.cells[rook.cell.y][3]);
        this.cells[king.cell.y][king.cell.x].moveFigure(this.cells[king.cell.y][2]);
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    private addKings() {
        new King(Colors.WHITE, this.getCell(4, 7));
        new King(Colors.BLACK, this.getCell(4, 0));
    }

    private addQueens() {
        new Queen(Colors.WHITE, this.getCell(3, 7));
        new Queen(Colors.BLACK, this.getCell(3, 0));
    }

    private addBishops() {
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
    }

    private addKnights() {
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
    }

    private addRooks() {
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
    }



    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addKnights();
        this.addRooks();
    }
}