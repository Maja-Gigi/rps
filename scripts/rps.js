// Save a score
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        } else if (computerMove === 'scissors') {
            result = 'You win.'
        }
    }

    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.'
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.'
        }
    }

    // Update a score
    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-results')
        .innerHTML = `${ result }`;
    
    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

// Computer randomlily selects a move
function pickComputerMove() {
    const randomMove = Math.random();

    let computerMove = '';

    if (randomMove >= 0 && randomMove < 1 / 3) {
        computerMove = 'rock';
    } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
        computerMove = 'paper';
    } else if (randomMove >= 2 / 3 && randomMove < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
};

function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
    }, 1000)
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}