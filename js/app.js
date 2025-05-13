/*-------------- Constants -------------*/
const emojiArr = ["🐏", "💕", "😊", "🐈"]
const numOfCards = 8;
const winningScore = 4;
const maxAttempts = 6;

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
const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
}

const generateBoard = () => {
    let cardArr = [];
    for (let i = 0; i < emojiArr.length; i++) {
        let card1 = document.createElement('div');
        let card2 = document.createElement('div');
        card1.textContent = emojiArr[i];
        card1.classList.add('card');
        card1.classList.add('cardBack');
        card2.textContent = emojiArr[i];
        card2.classList.add('card');
        card2.classList.add('cardBack');
        cardArr.push(card1);
        cardArr.push(card2);
    }
    let shuffled = shuffle(cardArr);
    shuffled.forEach(card => {
        board.appendChild(card)
    })
}

const play = (emoji) => {
    if (cardOne === emoji.target || cardTwo === emoji.target) {
        return;
    }
    if (cardOne === '') {
        cardOne = emoji.target;
        emoji.target.classList.add('cardFront')
    } else if (cardTwo === '') {
        cardTwo = emoji.target;
        emoji.target.classList.add('cardFront');
        compare(cardOne, cardTwo);
    }
    moves.innerHTML = `${attempts}/${maxAttempts} moves remaining`;
    score.innerHTML = `Score: ${points}/${winningScore}`;
}

const compare = (firstCard, secondCard) => {
    if (firstCard.textContent === secondCard.textContent) {
        points++;
        if (points >= winningScore) {
            winMessage.classList.remove('hidden');
            winMessage.classList.add('show');
            gameState = false;
        }
        cardOne = '';
        cardTwo = '';
    } else {
        attempts--;
        if (attempts === 0) {
            failMessage.classList.remove('hidden');
            failMessage.classList.add('show');
            gameState = false;
        }
        setTimeout(() => {
            cardTwo.classList.remove('cardFront');
            cardOne.classList.remove('cardFront');
            cardOne = '';
            cardTwo = '';
        }, 1000);
    }
}

const initialize = () => {
    if (gameState === false) {
        points = 0;
        attempts = 6;
        cardOne = '';
        cardTwo = '';
        gameState = true;
        moves.classList.remove('hidden');
        score.classList.remove('hidden');
        moves.classList.add('show');
        score.classList.add('show');
        moves.innerHTML = `${attempts}/${maxAttempts} attempts remaining.`
        score.innerHTML = `${points}/${winningScore} points scored.`
        generateBoard();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', play)
        })
    }
}

const reset = () => {
    gameState = false;
    board.innerHTML = '';
    initialize();
}

/*----------- Event Listeners ----------*/
startGameElement.addEventListener('click', initialize);
resetGameElement.addEventListener('click', reset);