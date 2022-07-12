//these are the choices of the game.   0 = Lapis,  1 = Scapella, 2 = Papyrus
let choices = ["Lapis", "Scapella", "Papyrus"];

//the labels for the game's choices are dynamic making it easier to change the options in choices to Rock Scissor Paper

//Lapis (rock)
const choiceOne = document.querySelectorAll('.choiceOne');
for (let el of choiceOne) {
    el.innerText = choices[0];
}
//Scapella (scissor)
const choiceTwo = document.querySelectorAll('.choiceTwo');
for (let el of choiceTwo) {
    el.innerText = choices[1];
}
//Papyrus (paper)
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
createScoreboard();

//Event listeners one the 3 game choice buttons and clear button
document.querySelector('.btn1').onclick = () => {
    newGame();
    myGame.playerChoice = 0;
    gameOutcome();
};
document.querySelector('.btn2').onclick = () => {
    newGame();
    myGame.playerChoice = 1;
    gameOutcome();
};
document.querySelector('.btn3').onclick = () => {
    newGame();
    myGame.playerChoice = 2;
    gameOutcome();
};

document.querySelector('.btn4').onclick = () => {
    clearHistory();
    console.log("game reset");
};




//function to reset everyone's move and the winner in myGame between rounds of play.
function newGame() {
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
    myGame.score = 0;
    myGame.id = 0;
    updateTotal()
}

//function that is the main flow once a player makes a choice
function gameOutcome() {
    //increment the game id
    myGame.id++;
    //The computer randomly picks 0,1 or 2 and posts to the myGame
    myGame.computerChoice = chooser();
    //Game Play final step: calculate the winner
    myGame.winner = determineWinner();
    console.log(myGame);
    postScore();
    updateTotal();
}

//function that displays who picked what, who won, and updates the total score.
function postScore() {
    let score = document.createElement('article');
    score.innerText = `Game ${myGame.id} - ${myGame.winner} Won! - You chose ${choices[myGame.playerChoice]}, the computer chose ${choices[myGame.computerChoice]}.`;
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.prepend(score);
}

function updateTotal() {
    const totalScore = document.querySelector('#totalScore');
    totalScore.innerText = myGame.score;
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
function chooser() {
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
        myGame.score++;
        return 'You';
    }
    //computer chooses 1
    else if (myGame.computerChoice === 1 && myGame.playerChoice === 2) {
        return 'The Computer';
    } else if (myGame.computerChoice === 1 && myGame.playerChoice === 0) {
        myGame.score++;
        return 'You';
    }
    //computer chooses 2
    else if (myGame.computerChoice === 2 && myGame.playerChoice === 0) {
        return 'The Computer';
    } else if (myGame.computerChoice === 2 && myGame.playerChoice === 1) {
        myGame.score++;
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