const Players = (sign) => {
    const tic = sign;
    
    return {tic};
}

const displayController = (() => {
    const playerTurn = document.querySelector('.player-turn');
    const classes = playerTurn.classList;
    
    const writeTic = (e) => {
        if (e.target.textContent === "" && playerTurn.classList.contains('player-1')) {
            e.target.textContent = gameModule.playerTwo.tic;
            gameModule.arrayOfO.push(parseInt(e.target.id));
        } else if (e.target.textContent === "" &&  !playerTurn.classList.contains('player-1')) {
            e.target.textContent = gameModule.playerOne.tic;
            gameModule.arrayOfX.push(parseInt(e.target.id));
        }
        gameBoard.board[parseInt(e.target.id)] = e.target.textContent;
    };

    const changeTurns = function() {
        let result = classes.toggle('player-1');

        !result ? playerTurn.textContent = `IT'S PLAYER 1'S TURN`
        : playerTurn.textContent = `IT'S PLAYER 2'S TURN`;
    };
    
    const gameWinner = function() {
        arrayX = gameModule.arrayOfX.sort((a,b) => a - b);
        arrayO = gameModule.arrayOfO.sort((a,b) => a - b);
    
        if (gameBoard.winningCombinations.some(combo => combo.every(item => arrayX.includes(item)))) {
            playerTurn.textContent = `PLAYER 1 WINS`;
            gameBoard.squares.forEach(square => square.textContent === "" ? square.textContent = " " : '');
        } else if (gameBoard.winningCombinations.some(combo => combo.every(item => arrayO.includes(item)))) {
            playerTurn.textContent = `PLAYER 2 WINS`;
            gameBoard.squares.forEach(square => square.textContent === "" ? square.textContent = " " : '');
        }
    }

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', () => {
        gameBoard.squares.forEach(square => square.textContent = '');
        gameBoard.board = gameBoard.board.map(x => "");
        gameModule.arrayOfO = [];
        gameModule.arrayOfX = [];

        if (playerTurn.classList.contains('player-1')) {
            playerTurn.classList.remove('player-1');
            playerTurn.textContent = `IT'S PLAYER 1'S TURN`;
        }
    })

    return {
        writeTic,
        changeTurns,
        gameWinner
    };
})();

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('click', (e) => {
        displayController.writeTic(e);
        displayController.changeTurns();
        displayController.gameWinner();
    }));

    const winningCombinations = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],        
        [0, 4, 8],
        [2, 4, 6]
    ]

    return {
        board,
        squares,
        winningCombinations
    };
})();

const gameModule = (() => {
    const playerOne = Players('X');
    const playerTwo = Players('O');
    const arrayOfX = [];
    const arrayOfO = [];

    
    return {
        playerOne,
        playerTwo,
        arrayOfX,
        arrayOfO
    };
})();