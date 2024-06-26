class Player {
    constructor(name) {
        this.name = name;
        this.roundScore = 0;
        this.totalScore = 0;
    }

    rollDice() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        this.calculateScore(dice1, dice2);
        return [dice1, dice2];
    }

    calculateScore(dice1, dice2) {
        if (dice1 === 1 || dice2 === 1) {
            this.roundScore = 0;
        } else if (dice1 === dice2) {
            this.roundScore = (dice1 + dice2) * 2;
        } else {
            this.roundScore = dice1 + dice2;
        }
        this.totalScore += this.roundScore;
    }

    reset() {
        this.roundScore = 0;
        this.totalScore = 0;
    }
}

const player = new Player('Player');
const computer = new Player('Computer');
let rounds = 0;

function updateUI(playerDice, computerDice) {
    const playerDiceContainer = document.getElementById('player-dice');
    const computerDiceContainer = document.getElementById('computer-dice');

    // Clear dice containers
    playerDiceContainer.innerHTML = '';
    computerDiceContainer.innerHTML = '';

    // Update dice images if not reset
    if (playerDice[0] !== 0 || playerDice[1] !== 0) {
        playerDiceContainer.innerHTML = `<img src="../images/dice${playerDice[0]}.png" alt="Dice"><img src="../images/dice${playerDice[1]}.png" alt="Dice">`;
    }
    if (computerDice[0] !== 0 || computerDice[1] !== 0) {
        computerDiceContainer.innerHTML = `<img src="../images/dice${computerDice[0]}.png" alt="Dice"><img src="../images/dice${computerDice[1]}.png" alt="Dice">`;
    }

    document.getElementById('player-round-score').textContent = player.roundScore;
    document.getElementById('player-total-score').textContent = player.totalScore;

    document.getElementById('computer-round-score').textContent = computer.roundScore;
    document.getElementById('computer-total-score').textContent = computer.totalScore;
}

function checkWinner() {
    let resultText;
    if (player.totalScore > computer.totalScore) {
        resultText = 'Congratulations Player wins!';
    } else if (player.totalScore < computer.totalScore) {
        resultText = 'Congratulation Computer wins!';
    } else {
        resultText = 'It\'s a tie!';
    }
    document.getElementById('result').textContent = resultText;
}

$(document).ready(function() {
    $('#roll-dice').on('click', () => {
        if (rounds < 3) {
            const playerDice = player.rollDice();
            const computerDice = computer.rollDice();
            updateUI(playerDice, computerDice);
            rounds++;
            if (rounds === 3) {
                checkWinner();
            }
        }
    });

    $('#reset-game').on('click', () => {
        player.reset();
        computer.reset();
        rounds = 0;
        updateUI([0, 0], [0, 0]);
        $('#result').text('');
    });

    $('#toggle-instructions').on('click', () => {
        const instructions = $('#instructions');
        if (instructions.is(':visible')) {
            instructions.fadeOut();
            $('#toggle-instructions').text('Show Instructions');
        } else {
            instructions.fadeIn();
            $('#toggle-instructions').text('Hide Instructions');
        }
    });
});