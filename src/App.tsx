import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import {Player} from './models/Player';
import {Colors} from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import {ComputerMoveService} from './services/ComputerMoveService';

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    let computerMoveService = new ComputerMoveService();

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    function handleComputerMove() {
        if (computerMoveService.computerMove(board, currentPlayer)) {
            swapPlayer();
        }
    }

    return (
        <div className="app">
            <button onClick={handleComputerMove}>Computer move</button>
            <Timer
                currentPlayer={currentPlayer}
                restart={restart}/>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Black Cats"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="White Cats"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
}

export default App;
