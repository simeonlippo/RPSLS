const choices = {
    "rock": { beats: ['lizard', 'scissors'] },
    "paper": { beats: ['rock', 'spock'] },
    "scissors": { beats: ['paper', 'lizard'] },
    "lizard": { beats: ['spock', 'paper'] },
    "spock": { beats: ['rock', 'scissors'] },
}

const result = document.getElementById('result')
const buttons = document.querySelectorAll('#choices button')
const playAgainButton = document.getElementById("play-again-button")

let playerScore = 0
let computerScore = 0

buttons.forEach((button) => {
    button.addEventListener('click', playGame)
})

function playGame(e) {
    if (playerScore >= 5 || computerScore >= 5) {
        return
    }
    const playerSelection = e.target.id
    const computerSelection = randomSelection()
    const winner = getWinner(playerSelection, computerSelection)
    displayResult(winner, playerSelection, computerSelection)
    updateScore(winner)
}

function randomSelection() {
    const selections = Object.keys(choices)
    return selections[Math.floor(Math.random() * selections.length)]
}

function getWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'tie'
    } else if (choices[playerSelection].beats.includes(computerSelection)) {
        return 'player'
    } else {
        return 'computer'
    }
}

function displayResult(winner, playerSelection, computerSelection) {
    if (winner === 'tie') {
        result.innerHTML = `It's a tie! You both selected ${playerSelection}.`
    } else if (winner === 'player') {
        result.innerHTML = `You Win! ${playerSelection} beats ${computerSelection}.`
    } else {
        result.innerHTML = `You lose! ${computerSelection} beats ${playerSelection}.`
    }
}

// Update the player score //

function updatePlayerScore() {
    playerScore++
    document.getElementById("player-score-number").innerHTML = playerScore
    if (playerScore >= 5) {
        result.innerHTML = "You win! You reached 5 points first."
    }
}

// Update the computer score //

function updateComputerScore() {
    computerScore++
    document.getElementById("computer-score-number").innerHTML = computerScore
    if (computerScore >= 5) {
        result.innerHTML = "You lose! The computer reached 5 points first."
    }
}

// Call the updatePlayerScore() or updateComputerScore() function depending on the outcome of the game //

// Check win and reset game //
function updateScore(winner) {
    if (winner === 'player') {
        updatePlayerScore()
    } else if (winner === 'computer') {
        updateComputerScore()
    }
    checkWin()
}

function checkWin() {
    if (playerScore === 5 || computerScore === 5) {
        playAgainButton.style.display = "block"
        playAgainButton.addEventListener("click", resetGame)
    }
}

function resetGame() {
    playerScore = 0
    computerScore = 0
    document.getElementById("player-score-number").innerHTML = playerScore
    document.getElementById("computer-score-number").innerHTML = computerScore
    playAgainButton.style.display = "none"
}

