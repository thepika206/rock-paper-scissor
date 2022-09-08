//* -----------------------------Constants-------------------------------------
let choices = ["Lapis", "Scapella", "Papyrus"];


//* -----------------------------Variables (state)------------------------------
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
    choseOne: 0,
    choseTwo: 0,
    choseThree: 0
}


//* -----------------------------Cached Element References---------------------
//the text for the choices are used all over the html doc, so this selects all by class and sets them dynamically.  It would be easy to relabel the choices.
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

let headers = document.querySelectorAll(".headerBtn");
for (header of headers) {
    header.addEventListener("click", function () {
        console.log("clicked");
        let cardContent = this.nextElementSibling;
        cardContent.classList.toggle("collapsed");
        let cardArrow = this.querySelector(".cardIndicator");
        cardArrow.classList.toggle("collapsed");
    });
}



//* -----------------------------Event Listeners-------------------------------

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

//* -----------------------------Functions-------------------------------------
createScoreboard();


function clearMyStats() {
    myStats = {
        wins: 0,
        choseOne: 0,
        choseTwo: 0,
        choseThree: 0
    }
}

//functions to set your choice
function pickChoiceOne() {
    resetChoices();
    myGame.playerChoice = 1;
    myStats.choseOne++;
    console.log(myStats);
    gameOutcome();
}
function pickChoiceTwo() {
    resetChoices();
    myGame.playerChoice = 2;
    myStats.choseTwo++;
    console.log(myStats);
    gameOutcome();
}
function pickChoiceThree() {
    resetChoices();
    myGame.playerChoice = 3;
    myStats.choseThree++;
    console.log(myStats);
    gameOutcome();
}



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
    resetChoices();
    clearAchievements();
    clearMyStats();
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
    if (myStats.choseOne === 10) {
        alert('Game Achievement: I only need one choice');
        const ach = document.querySelector('#ach3');
        ach.innerText = "Choice# 1 - picked 10 times";
        myStats.achievementRockyX = true;
    }

}

function clearAchievements() {
    const ach1 = document.querySelector('#ach1');
    ach1.innerText = "Achievement 1 - locked";
    const ach2 = document.querySelector('#ach2');
    ach2.innerText = "Achievement 2 - locked";
}
