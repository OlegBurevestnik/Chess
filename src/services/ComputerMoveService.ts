import {Figure} from "../models/figures/Figure";
import {Cell} from "../models/Cell";
import {Board} from "../models/Board";
import {Player} from "../models/Player";

export class ComputerMoveService {

    public computerMove(board: Board, currentPlayer: Player | null): boolean {
        let result: boolean = false;

        const figures: Figure[] = [];

        for (let i = 0; i < board.cells.length; i++) {
            const row = board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell.figure !== null && currentPlayer?.color === cell.figure.color) {
                    figures.push(cell.figure);
                }
            }
        }

        interface PossibleMove{
            figure: Figure;
            cell: Cell;
        }

        const possibleMoves: PossibleMove[] = [];

        figures.forEach((figure) => {
            for (let i = 0; i < board.cells.length; i++) {
                const row = board.cells[i];
                for (let j = 0; j < row.length; j++) {
                    const cell = row[j];
                    if (figure.canMove(cell)) {
                        possibleMoves.push({
                            figure,
                            cell
                        });
                    }
                }
            }
        });

        const moveIndex = Math.round(Math.random() * (possibleMoves.length - 1));
        const figureToMove = possibleMoves[moveIndex].figure;
        const targetCell = possibleMoves[moveIndex].cell;
        console.log('moveNumber: ' + moveIndex);
        console.log('possibleMoves.length: ' + possibleMoves.length);

        if (figureToMove !== null && targetCell !== null) {
            let sourceCell = (figureToMove as Figure).cell;
            sourceCell.moveFigure(targetCell);
            result = true;
        }

        return result;
    };

}