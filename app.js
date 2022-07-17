
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
    // score: 0, //this was moved into the new variable myStats.wins and is no longer used
    computerChoice: null,
    playerChoice: null,
    winner: null,
    // playerName: null,
};

//document game results besides placing it on screen
let gameHistory = [];

//track player's stats
let myStats = {
    wins: 0,


}

createScoreboard();


//functions to set your choice
function pickChoiceOne() {
    resetChoices();
    myGame.playerChoice = 1;
    gameOutcome();
}
function pickChoiceTwo() {
    resetChoices();
    myGame.playerChoice = 2;
    gameOutcome();
}
function pickChoiceThree() {
    resetChoices();
    myGame.playerChoice = 3;
    gameOutcome();
}
//Event listeners on the 3 game choice buttons that set the player choice and proceed to the game outcome function

document.querySelector('#btn1').addEventListener('click', pickChoiceOne);
document.querySelector('#btn2').addEventListener('click', pickChoiceTwo);
document.querySelector('#btn3').addEventListener('click', pickChoiceThree);
//Event listener on the Clear History and Start Over button
document.querySelector('#btn4').addEventListener('click', resetGame);

//keyboard eventlisteners
window.addEventListener('keydown', function (e) {
    console.log(e.key)
    switch (e.key) {
        case '1': pickChoiceOne()
            break;
        case '2': pickChoiceTwo()
            break;
        case '3': pickChoiceThree()
            break;
    }
})

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
    //store the game result
    const myGameResult = {
        id: myGame.id,
        computerChoice: myGame.computerChoice,
        playerChoice: myGame.playerChoice,
        winner: myGame.winner,
    };
    gameHistory.push(myGameResult);
    console.log(gameHistory);
    postScore();
    updateTotalWins();
    checkAchievements();
}

//function that displays who picked what, who won, and updates the total score.
function postScore() {
    let score = document.createElement('article');
    score.innerText = `Game ${myGame.id} - ${myGame.winner} Won - the computer chose ${choices[myGame.computerChoice - 1]}, you chose ${choices[myGame.playerChoice - 1]}.`;
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.prepend(score);
    let winner = document.querySelector('#gameWinner')
    winner.innerText = myGame.winner;
}

function updateTotalWins() {
    const totalWins = document.querySelector('#totalWins');
    totalWins.innerText = myStats.wins;
}

//function to clear the posted scores and restart the game id count
function resetGame() {
    let winner = document.querySelector('#gameWinner')
    winner.innerText = 'Game not started';
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.remove();
    createScoreboard();
    clearAchievements();
};

//function for the random computer's move
function randomChooser() {
    return Math.floor(Math.random() * 3 + 1);
};

//function with the game logic to determine who won.  
//Game Rules: 1 beats 2, 2 beats 3, 3 beats 1 
function determineWinner() {
    //computer ahd player choice are the same
    if (myGame.computerChoice === myGame.playerChoice) {
        return 'Nobody';
    }
    //computer chooses 1
    else if (myGame.computerChoice === 1 && myGame.playerChoice === 2) {
        return 'The Computer';
    } else if (myGame.computerChoice === 1 && myGame.playerChoice === 3) {
        myStats.wins++;
        return 'You';
    }
    //computer chooses 2
    else if (myGame.computerChoice === 2 && myGame.playerChoice === 3) {
        return 'The Computer';
    } else if (myGame.computerChoice === 2 && myGame.playerChoice === 1) {
        myStats.wins++;
        return 'You';
    }
    //computer chooses 3
    else if (myGame.computerChoice === 3 && myGame.playerChoice === 1) {
        return 'The Computer';
    } else if (myGame.computerChoice === 3 && myGame.playerChoice === 2) {
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

collapseRules() //hide by default
function collapseRules() {
    document.querySelector('#rules').classList.toggle('collapsed');
}
ruleHeaderBtn = document.querySelector('#rulesHeader');
ruleHeaderBtn.addEventListener('click', collapseRules);

collapseAchievements() //hide by default
function collapseAchievements() {
    document.querySelector('#achievements').classList.toggle('collapsed');
}
ruleHeaderBtn = document.querySelector('#achievementsHeader');
ruleHeaderBtn.addEventListener('click', collapseAchievements);

//achievements
function checkAchievements() {
    if (myStats.wins === 1 && myStats.achievementFirstWin !== true) {
        alert('Game Achievement: First Victory');
        const ach = document.querySelector('#ach1');
        ach.innerText = "First Win";
        myStats.achievementFirstWin = true;
    }
    if (myStats.wins === 5 && myStats.achievementFiveWins !== true) {
        alert('Gane Achievement: Five Victories');
        const ach = document.querySelector('#ach2');
        ach.innerText = "Five Victories";
        myStats.achievementFiveWins = true;
    }

}

function clearAchievements() {
    const ach1 = document.querySelector('#ach1');
    ach1.innerText = "Achievement 1 - locked";
    const ach2 = document.querySelector('#ach2');
    ach2.innerText = "Achievement 2 - locked";
}
