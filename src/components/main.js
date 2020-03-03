import React, { Component } from 'react';
import Row from './row';

class Main extends Component{

    state = {
        board: null,
        // score: 0,
        gameOver: false,
        message: null
    };

    // Create board with one random coordinate numbers
    startBoard = () => {
        let board = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];
        // board = this.placeRandom(this.placeRandom(board));
        board = (this.placeRandom(board));
        this.setState({
                board, 
                // score: 0, 
                gameOver: false, 
                message: null
            });
    }
          
    // Get all blank coordinates from board
    getBlankCoordinates = (board) => {
        const blankCoordinates = [];
        
        // iterate through each row in the array
        for (let r = 0; r < board.length; r++) {
            // iterate through each each item in a row
            for (let j = 0; j < board[r].length; j++) {
                if (board[r][j] === 0) {blankCoordinates.push([r, j])}
            }
        }
                
        return blankCoordinates;
    }
          
    //to get the start number
    randomStartingNumber = ()  => {
        const startingNumber = [2];
        const randomNumber = startingNumber[Math.floor(Math.random() * startingNumber.length)];
        return randomNumber;
    }
          
    // Place random starting number on an empty coordinate
    placeRandom = (board) => {
        const blankCoordinates = this.getBlankCoordinates(board);
        const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
        const randomNumber = this.randomStartingNumber();
        board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
        return board;
    }
          
    // Compares two boards to check for movement
    boardMoved = (original, updated) => {
        return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
    }
          
    // Moves board depending on direction and checks for game over
    move = (direction) => {
        if (!this.state.gameOver) {
            if (direction === 'up') {
                const movedUp = this.moveUp(this.state.board);
                if (this.boardMoved(this.state.board, movedUp.board)) {
                    const upWithRandom = this.placeRandom(movedUp.board);
                    
                    if (this.onGameOver(upWithRandom)) {
                        this.setState({
                                board: upWithRandom, 
                                gameOver: true,
                                message: 'Game over!'
                            });
                    } else {
                        this.setState({
                                board: upWithRandom, 
                                // score: this.state.score += movedUp.score
                            });  
                    }
                }
            } else if (direction === 'right') {
                const movedRight = this.moveRight(this.state.board);
                if (this.boardMoved(this.state.board, movedRight.board)) {
                    const rightWithRandom = this.placeRandom(movedRight.board);
                    
                    if (this.onGameOver(rightWithRandom)) {
                        this.setState({
                                board: rightWithRandom, 
                                gameOver: true, 
                                message: 'Game over!'
                            });
                    } else {
                        this.setState({
                                board: rightWithRandom, 
                                // score: this.state.score += movedRight.score
                            });  
                    }
                }
            } else if (direction === 'down') {
                const movedDown = this.moveDown(this.state.board);
                if (this.boardMoved(this.state.board, movedDown.board)) {
                    const downWithRandom = this.placeRandom(movedDown.board);
                    
                    if (this.onGameOver(downWithRandom)) {
                        this.setState({
                                board: downWithRandom, 
                                gameOver: true, 
                                message: 'Game over!'
                            });
                    } else {
                        this.setState({
                                board: downWithRandom, 
                                // score: this.state.score += movedDown.score
                            });
                    }
                }
            } else if (direction === 'left') {
                const movedLeft = this.moveLeft(this.state.board);
                if (this.boardMoved(this.state.board, movedLeft.board)) {
                    const leftWithRandom = this.placeRandom(movedLeft.board);
                    
                    if (this.onGameOver(leftWithRandom)) {
                        this.setState({
                                board: leftWithRandom, 
                                gameOver: true, 
                                message: 'Game over!'
                            });  
                    } else {
                        this.setState({
                                board: leftWithRandom, 
                                // score: this.state.score += movedLeft.score
                            });
                    }
                }
            }
        } else {
            this.setState({
                    message: 'Game over. Please start a new game.'
                });
        }
    }
      
    // on key up the numbers will move using moveup function
    moveUp = (inputBoard) => {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        // let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = 0; c < rotatedRight[r].length; c++) {
            let current = rotatedRight[r][c];
            (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
            if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                board[r][c] = board[r][c] * 2;
                board[r][c - 1] = 0;
                // score += board[r][c];
            } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                board[r][c] = board[r][c - 1];
                board[r][c - 1] = 0;
            }
            }
        }

        // Rotate board back upright
        board = this.rotateLeft(board);

        // return {board, score};
        return {board};
    }
     
    // on key down the numbers will move using movedown function
    moveDown = (inputBoard) => {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        // let score = 0;

        // Shift all numbers to the left
        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];      
            for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
            let current = rotatedRight[r][c];
            (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
            if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                board[r][c] = board[r][c] * 2;
                board[r][c + 1] = 0;
                // score += board[r][c];
            } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                board[r][c] = board[r][c + 1];
                board[r][c + 1] = 0;
            }
            }
        }

        // Rotate board back upright
        board = this.rotateLeft(board);

        // return {board, score};
        return {board};
    }

    // on key right the numbers will move using moveright function
    moveRight =(inputBoard) => {
        let board = [];
        // let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];      
            for (let c = 0; c < inputBoard[r].length; c++) {
            let current = inputBoard[r][c];
            (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
            if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                board[r][c] = board[r][c] * 2;
                board[r][c - 1] = 0;
                // score += board[r][c];
            } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                board[r][c] = board[r][c - 1];
                board[r][c - 1] = 0;
            }
            }
        }

        // return {board, score};
        return {board};
    }
       
    // on key left the numbers will move using moveleft function
    moveLeft = (inputBoard) => {
        let board = [];
        // let score = 0;
    
        // Shift all numbers to the left
        for (let r = 0; r < inputBoard.length; r++) {
        let row = [];      
        for (let c = inputBoard[r].length - 1; c >= 0; c--) {
            let current = inputBoard[r][c];
            (current === 0) ? row.push(current) : row.unshift(current);
        }
        board.push(row);
        }
    
        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                board[r][c] = board[r][c] * 2;
                board[r][c + 1] = 0;
                // score += board[r][c];
                } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                board[r][c] = board[r][c + 1];
                board[r][c + 1] = 0;
                }
            }
        }
        
        // return {board, score};
        return {board};
    }
          
    rotateRight =(matrix) =>{
    let result = [];
    
        for (let c = 0; c < matrix.length; c++) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.push(matrix[r][c]);
            }
        result.push(row);
        }
    
        return result;
    }
    
    rotateLeft = (matrix) => {
        let result = [];

        for (let c = matrix.length - 1; c >= 0; c--) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
            row.unshift(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }
          
    // to check if there are any random moves left on the board
    onGameOver = (board)  => {
        let moves = [
            this.boardMoved(board, this.moveUp(board).board),
            this.boardMoved(board, this.moveRight(board).board),
            this.boardMoved(board, this.moveDown(board).board),
            this.boardMoved(board, this.moveLeft(board).board)
        ];
        
        return (moves.includes(true)) ? false : true;
    }
          
    componentWillMount() {
        this.startBoard();  
        const body = document.querySelector('body');
        body.addEventListener('keydown', this.onKeyPress);
    }
          
    onKeyPress = (e) => {
        const up = 38;
        const right = 39;
        const down = 40;
        const left = 37
        const n = 78;
        
        if (e.keyCode === up) {
            this.move('up');
        } else if (e.keyCode === right) {
            this.move('right');
        } else if (e.keyCode === down) {
            this.move('down');
        } else if (e.keyCode === left) {
            this.move('left');
        } else if (e.keyCode === n) {
            this.startBoard();
        }
    }
            

    render() {
        return (
        <div className="main">  
            
            {/* <div className="score">Score: {this.state.score}</div> */}

            <div className="game_board">
                <div className="game_container">
                    {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
                </div>
            </div>
                 
            <div className="button" onClick={() => {this.startBoard()}}>New Game</div>
            <p>{this.state.message}</p>
        </div>
    );
  }
}

export default Main;
