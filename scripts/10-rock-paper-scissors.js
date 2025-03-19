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
    document.querySelector('.js-score').innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
}

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = determineWinner(playerMove, computerMove);

    // Update score
    if (result === "You win!") {
        score.wins++;
    } else if (result === "You lose!") {
        score.losses++;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    // Update result and moves
    document.querySelector('.js-result').textContent = result;
    document.querySelector('.js-moves').innerHTML = `
        You: <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon"> 
        vs 
        Computer: <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">
    `;
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').textContent = 'Score reset!';
    document.querySelector('.js-moves').innerHTML = 'Choose your move!';
}