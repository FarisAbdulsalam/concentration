// plan

// 1. declare all variables, constants, cached element references, and event listeners
// constants: number of cards, array for the cards, winning score
// variables: state of game(whether the game is started or not), current score, attempts, two variables to hold cards for comparison purposes
// cached elements: start/reset button, the cards to click on, the win/lose messages
// event listeners: click event listeners for the cards and start/reset buttons

// 2. create an initialize function that resets all variables and readies the game for play. this function will be called upon
// clicking the start button

// 3. create a function that randomizes then renders all the cards on the screen 

// 4. a function that flips the cards after they're clicked

// 5. a function that compares two cards and adjusts attempts and score accordingly

/*-------------- Constants -------------*/
const emojiArr = ["🐏", "🐏", "💕", "💕", "😊", "😊", "🐈", "🐈"]
const numOfCards = 8;
const winningScore = 4;

/*---------- Variables (state) ---------*/
let gameState = false;
let points = 0;
let attempts = 6;
let cardOne = '';
let cardTwo = '';

/*----- Cached Element References  -----*/
const board = document.getElementById('board');
const moves = document.getElementById('moves');
const score = document.getElementById('score');
const startGameElement = document.querySelector('#startButton');
const resetGameElement = document.querySelector('#resetButton')
const winMessage = document.getElementById('winMessage');
const failMessage = document.getElementById('failMessage');

/*-------------- Functions -------------*/
const initialize = () => {
    if(gameState === false){
        points = 0;
        attempts = 6;
        cardOne = '';
        cardTwo = '';
        moves.classList.remove('hidden');
        score.classList.remove('hidden');
        moves.classList.add('show');
        score.classList.add('show');
    }
}

/*----------- Event Listeners ----------*/
startGameElement.addEventListener('click', initialize);