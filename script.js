const tile = document.querySelectorAll('.tile');
const playerText = document.querySelector('.playerText');
const restartBtn = document.querySelector('.resetBtn');
let gameEnded = false; // Flag to track if the game has ended

const xMark = document.querySelector('.xMark');
const oMark = document.querySelector('.oMark');
xScore = 0;
oScore = 0;

function gameDown() {
    const markPos = [];
    tile.forEach(tile => {
        markPos.push(tile.textContent);
    });
    const winConditions = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6]
    ];
    // Check each win condition
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (markPos[a] && markPos[a] === markPos[b] && markPos[a] === markPos[c]) {
            // MarkPos[a] is either 'X' or 'O', indicating a win
            console.log(`Player ${markPos[a]} wins!`);
            if(markPos[a] === 'X'){
                xScore++;
                xMark.textContent = xScore;
            }else if(markPos[a] === 'O'){
                oScore++;
                oMark.textContent = oScore;
            }
            gameEnded = true; // Set gameEnded flag to true
            // Optionally, you can update UI or perform other actions to end the game
            return true; // Return true to indicate the game is won
        }
    }
    // Check if the board is full (tie condition)
    if (markPos.every(pos => pos !== '')) {
        console.log('It\'s a tie!');
        // Optionally, handle tie condition here
        return true; // Return true to indicate the game is tied
    }
    return false; // Return false to indicate game is still active
}

// Event listener for tile clicks
tile.forEach(tile => {
    tile.addEventListener('click', () => {
        if (tile.textContent === '') {
            tile.textContent = gameIsActive.mark; // Update tile with current mark
            gameIsActive.mark = gameIsActive.mark === 'X' ? 'O' : 'X'; // Toggle mark
            // Check game status after each move
            if (gameDown()) {
                // Optionally, you can add logic to disable further clicks or show a restart button
                gameEnded = true;
                gameIsActive.disableTiles();
                console.log('Game Over!');
                // Add logic here to handle game over state
                
            }
        } else if (gameEnded || tile.classList.contains('disabled')) {
            alert('Game Over! Please restart to play again.'); // Inform player game is over
        }else {
            alert('Tile already filled');
        }
    });
    
});

const gameIsActive = (function (){
    let mark = 'X';
    gameDown();
    tile.forEach(tile => {
        tile.addEventListener('click', () => {
            if(tile.textContent === ''){
                tile.textContent = mark;
                mark = mark === 'X' ? 'O' : 'X';
                // console.log(mark); Prints the Mark 'X or O'
            }
        }
    )
    });
    function disableTiles(){
        tile.forEach(tile => {
            tile.classList.add('disabled');
        });
    }
    function enableTiles(){
        tile.forEach(tile => {
            tile.classList.remove('disabled');
        });
    }
    return {mark, tile, disableTiles, enableTiles};
})();

restartBtn.addEventListener('click', () => {
    tile.forEach(tile => {
        tile.textContent = '';
    });
    gameIsActive.mark = 'X';
    gameEnded = false;
    gameIsActive.enableTiles();
    console.log('Game restarted!');
});