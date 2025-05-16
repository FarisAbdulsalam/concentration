/*-------------- Constants -------------*/
const imageArr = ["https://i.imgur.com/y49U8G2.png", "https://i.imgur.com/ChBnc5w.png", "https://i.imgur.com/NicESuX.png", "https://i.imgur.com/shgENDn.png"]
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
const winMessage = document.getElementById('winMessage');
const failMessage = document.getElementById('failMessage');

/*-------------- Functions -------------*/
const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
}

const generateBoard = () => {
    let cardArr = [];
    for (let i = 0; i < imageArr.length; i++) {
        let card1 = document.createElement('div');
        let card2 = document.createElement('div');
        card1.classList.toggle('card');
        card1.classList.toggle('cardBack');
        card2.classList.toggle('card');
        card2.classList.toggle('cardBack');
        card1.setAttribute("data-image", imageArr[i]);
        card2.setAttribute("data-image", imageArr[i]);
        cardArr.push(card1);
        cardArr.push(card2);
    }
    let shuffled = shuffle(cardArr);
    shuffled.forEach(card => {
        board.appendChild(card)
    })
}

const play = (card) => {
    if (attempts <= 0 || !gameState) {
        return;
    }
    if (cardOne === card.target || cardTwo === card.target) {
        return;
    }
    if (cardOne === '') {
        cardOne = card.target;
        cardOne.classList.add('cardFront');
        cardOne.classList.toggle('cardBack');
        cardOne.style.backgroundImage = `url(${cardOne.getAttribute("data-image")})`;
    } else if (cardTwo === '') {
        cardTwo = card.target;
        cardTwo.classList.add('cardFront');
        cardTwo.classList.toggle('cardBack');
        cardTwo.style.backgroundImage = `url(${cardTwo.getAttribute("data-image")})`;
        compare(cardOne, cardTwo);
    }
    moves.innerHTML = `${attempts}/${maxAttempts} moves remaining`;
    score.innerHTML = `Score: ${points}/${winningScore}`;
}

const compare = (firstCard, secondCard) => {
    if (firstCard.getAttribute("data-image") === secondCard.getAttribute("data-image")) {
        points++;
        firstCard.style.pointerEvents = "none";
        secondCard.style.pointerEvents = "none";
        if (points >= winningScore) {
            winMessage.classList.remove('hidden');
            winMessage.classList.add('show');
            moves.classList.remove('show');
            moves.classList.add('hidden');
            score.classList.remove('show');
            score.classList.add('hidden');
            startGameElement.style.display = "block";
            gameState = false;
            board.classList.add('blur')
        }
        cardOne = '';
        cardTwo = '';
    } else {
        attempts--;
        if (attempts === 0) {
            failMessage.classList.remove('hidden');
            failMessage.classList.add('show');
            gameState = false;
            moves.classList.remove('show');
            moves.classList.add('hidden');
            score.classList.remove('show');
            score.classList.add('hidden');
            startGameElement.style.display = "block";
            board.classList.add('blur')

        }
        setTimeout(() => {
            cardTwo.classList.toggle('cardFront');
            cardOne.classList.toggle('cardFront');
            cardTwo.classList.toggle('cardBack');
            cardOne.classList.toggle('cardBack');
            cardTwo.style.backgroundImage = "";
            cardOne.style.backgroundImage = "";
            cardOne = '';
            cardTwo = '';
        }, 1000);
    }
};


const initialize = () => {
    points = 0;
    attempts = 6;
    cardOne = '';
    cardTwo = '';
    gameState = true;
    board.innerHTML = '';
    moves.classList.remove('hidden');
    score.classList.remove('hidden');
    moves.classList.add('show');
    score.classList.add('show');
    board.classList.remove('blur');
    winMessage.classList.add('hidden');
    failMessage.classList.add('hidden');
    moves.innerHTML = `${attempts}/${maxAttempts} attempts remaining.`
    score.innerHTML = `${points}/${winningScore} points scored.`
    generateBoard();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', play)
    })
}

/*----------- Event Listeners ----------*/
// startGameElement.addEventListener('click', initialize);
startGameElement.addEventListener('click', () => {
    startGameElement.style.display = 'none';
    initialize();
})