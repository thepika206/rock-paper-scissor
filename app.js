//these are the choices of the game.   0 = Lapis,  1 = Scapella, 2 = Papyrus
let choices = ["Lapis", "Scapella", "Papyrus"];

//the text for the choices are used all over the html doc, so this selects all by class and sets them dynamically.  It would be easy to relabel the choices.
//(rock)
const choiceOne = document.querySelectorAll('.choiceOne');
for (let el of choiceOne) {
    el.innerText = choices[0];
}
//(scissor)
const choiceTwo = document.querySelectorAll('.choiceTwo');
for (let el of choiceTwo) {
    el.innerText = choices[1];
}
//(paper)
const choiceThree = document.querySelectorAll('.choiceThree');
for (let el of choiceThree) {
    el.innerText = choices[2];
}


// myGame Object keeps track of the player and computer choices and winner of the each game to display the game outcome.  
let myGame = {
    id: 0,
    score: 0,
    computerChoice: null,
    playerChoice: null,
    winner: null,
    // playerName: null,
};

let myStats = {
    wins: 0,

}

createScoreboard();

//Event listeners on the 3 game choice buttons that set the player choice and proceed to the game outcome function

document.querySelector('#btn1').addEventListener('click', function pickChoiceOne() {
    resetChoices();
    myGame.playerChoice = 0;
    gameOutcome();
})
document.querySelector('#btn2').addEventListener('click', function pickChoiceTwo() {
    resetChoices();
    myGame.playerChoice = 1;
    gameOutcome();
})
document.querySelector('#btn3').addEventListener('click', function pickChoiceThree() {
    resetChoices();
    myGame.playerChoice = 2;
    gameOutcome();
})

document.querySelector('#btn4').addEventListener('click', clearHistory);

// refactored this with event listeners
// document.querySelector('#btn1').onclick = () => {
//     resetChoices();
//     myGame.playerChoice = 0;
//     gameOutcome();
// };
// document.querySelector('#btn2').onclick = () => {
//     resetChoices();
//     myGame.playerChoice = 1;
//     gameOutcome();
// };
// document.querySelector('#btn3').onclick = () => {
//     resetChoices();
//     myGame.playerChoice = 2;
//     gameOutcome();
// };

//clear history button
// document.querySelector('#btn4').onclick = () => {
//     clearHistory();
//     console.log("game reset");
// };




//function to reset everyone's move and the winner in myGame between rounds of play.
function resetChoices() {
    let myGame = {
        computerChoice: null,
        playerChoice: null,
        winner: null,
    };
}

function createScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';
    const scoreboardLocation = document.querySelector('#gameOutcome');
    scoreboardLocation.append(scoreboard);
    myStats.wins = 0;
    myGame.id = 0;
    updateTotalWins()
}

//function that is the main flow once a player makes a choice
function gameOutcome() {
    //increment the game id
    myGame.id++;
    //The computer randomly picks 0,1 or 2 and posts to the myGame
    myGame.computerChoice = randomChooser();
    //Game Play final step: calculate the winner
    myGame.winner = determineWinner();
    console.log(myGame);
    postScore();
    updateTotalWins();
}

//function that displays who picked what, who won, and updates the total score.
function postScore() {
    let score = document.createElement('article');
    score.innerText = `Game ${myGame.id} - ${myGame.winner} Won! - You chose ${choices[myGame.playerChoice]}, the computer chose ${choices[myGame.computerChoice]}.`;
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.prepend(score);
}

function updateTotalWins() {
    const totalWins = document.querySelector('#totalWins');
    totalWins.innerText = myStats.wins;
}

//function to clear the posted scores and restart the game id count
function clearHistory() {
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.remove();
    createScoreboard();

    // while(myGame.id !==0){
    // const scoreboard = document.querySelector('article');
    // scoreboard.remove();
    // myGame.id--;
    // }
};

//function for the random computer's move
function randomChooser() {
    return Math.floor(Math.random() * 3);
};

//function with the game logic to determine who won.  
//Game Rules: 0 beats 1, 1 beats 2, 2 beats 0 
function determineWinner() {
    //computer ahd player choice are the same
    if (myGame.computerChoice === myGame.playerChoice) {
        return 'Nobody';
    }
    //computer chooses 0
    else if (myGame.computerChoice === 0 && myGame.playerChoice === 1) {
        return 'The Computer';
    } else if (myGame.computerChoice === 0 && myGame.playerChoice === 2) {
        myStats.wins++;
        return 'You';
    }
    //computer chooses 1
    else if (myGame.computerChoice === 1 && myGame.playerChoice === 2) {
        return 'The Computer';
    } else if (myGame.computerChoice === 1 && myGame.playerChoice === 0) {
        myStats.wins++;
        return 'You';
    }
    //computer chooses 2
    else if (myGame.computerChoice === 2 && myGame.playerChoice === 0) {
        return 'The Computer';
    } else if (myGame.computerChoice === 2 && myGame.playerChoice === 1) {
        myStats.wins++;
        return 'You';
    }
    // error log for bad input 
    else { console.log('Cannot determine winner') }
};


//collapsible cards
function collapsePlay() {
    document.querySelector('#play').classList.toggle('collapsed')
}
playHeaderBtn = document.querySelector('#playHeader');
playHeaderBtn.addEventListener('click', collapsePlay);

function collapseRules() {
    document.querySelector('#rules').classList.toggle('collapsed')
}
ruleHeaderBtn = document.querySelector('#rulesHeader');
ruleHeaderBtn.addEventListener('click', collapseRules);