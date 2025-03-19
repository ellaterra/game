let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function getComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'Rock';
    } else if (randomNumber < 2 / 3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return "It's a tie!";
    }
    if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        return "You win!";
    }
    return "You lose!";
}

function updateScoreElement() {
    const scoreElement = document.querySelector('.js-score');
    if (scoreElement) {
        scoreElement.innerHTML = `
            Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
        `;
    }
}

let isAutoPlaying = false;
let intervalID = null;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = getComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

document.querySelector('js-rock-button');
addEventListener('click',()=>{
    playGame('rock');   
})

document.querySelector('js-paper-button');
addEventListener('click',()=>{
    playGame('paper');   
})

document.querySelector('js-scissors-button');
addEventListener('click',()=>{
    playGame('scissors');   
})


document.body.addEventListener('keydown',(event)=>{
   if (event.key==='r'){
    playGame('rock');
   }else if (event.key==='p'){
    playGame('paper');
   }else if (event.key==='s'){
    playGame('scissors');
   }
})


function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = determineWinner(playerMove, computerMove);

    // Update score //
    if (result === "You win!") {
        score.wins++;
    } else if (result === "You lose!") {
        score.losses++;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    // Update result and moves//
    const resultElement = document.querySelector('.js-result');
    const movesElement = document.querySelector('.js-moves');

    if (resultElement) {
        resultElement.textContent = result;
    }

    if (movesElement) {
        movesElement.innerHTML = `
            You: <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon" alt="${playerMove}">
            vs
            Computer: <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon" alt="${computerMove}">
        `;
    }
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();

    const resultElement = document.querySelector('.js-result');
    const movesElement = document.querySelector('.js-moves');

    if (resultElement) {
        resultElement.textContent = 'Score reset!';
    }

    if (movesElement) {
        movesElement.innerHTML = 'Choose your move!';
    }
}
