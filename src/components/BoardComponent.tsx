import React, {FC, useEffect, useState} from 'react';
import {Board} from '../models/Board';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Player} from '../models/Player';
import {King} from '../models/figures/King';
import CoordinateCharacterComponent from './CoordinateCharacterComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const digits: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            if (selectedCell.figure instanceof King && board.checkShortCastle(selectedCell.figure, cell))
                board.doShortCastle(selectedCell.figure);
            else if (selectedCell.figure instanceof King && board.checkLongCastle(selectedCell.figure, cell))
                board.doLongCastle(selectedCell.figure);
            else
                selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            if (cell.figure?.color === currentPlayer?.color)
                setSelectedCell(cell);
        }
    }

    useEffect(() => {
        highLightCells();
    }, [selectedCell]);

    function highLightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Current cat {currentPlayer?.color}</h3>
            <div className="board">
                <>
                    <CoordinateCharacterComponent coordinateCharacter={''}/>
                    {letters.map((letter) =>
                        <CoordinateCharacterComponent coordinateCharacter={letter}/>
                    )}
                    {board.cells.map((row, index) =>
                        <React.Fragment key={index}>
                            <CoordinateCharacterComponent coordinateCharacter={digits[index]}/>
                            {row.map(cell =>
                                <CellComponent
                                    click={click}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            )}
                        </React.Fragment>
                    )}
                </>
            </div>
        </div>
    );
};

export default BoardComponent;
