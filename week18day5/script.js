const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = 'X';
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const winninMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in a draw';
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const hadledCellPlayed = (clickedCell, clickCellIndex) => {
    gameStatus[clickCellIndex] =  currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const handelPlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML = currentPlayerTurn();
}

const handleResultValidation = () => {
    let roundWoon = false;
    for (let i =0; i<=7; i++) {
        const winCondition = winningCondition[i];
        let a = gameStatus[winCondition[0]];
        let b = gameStatus[winCondition[1]];
        let c = gameStatus[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWoon = true;
            break;
        }
    }

    if (roundWoon) {
        statusDisplay.innerHTML = winninMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameStatus.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handelPlayerChange();
}

const handleCellClicked = (clickCellEvent) => {
    const clickedCell = clickCellEvent.target;
    const clickCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameStatus[clickCellIndex] !== '' || !gameActive) {
        return;
    }

    hadledCellPlayed(clickedCell, clickCellIndex)
    handleResultValidation();
}

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer =  "X";
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell =>  cell.addEventListener('click', handleCellClicked));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);