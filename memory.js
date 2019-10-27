const cards = document.querySelectorAll('.memory-card');
const game = document.querySelector('.memory-game');
const button = document.getElementById("button");
const start = document.getElementById("start");
const message = document.getElementById("message");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

button.addEventListener("click", newGame);
start.addEventListener("click", unShowAll);

function unShowAll() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('flip');
        unShow = true;
        button.innerHTML = "New Game";
    }
}

function newGame() {
    location.reload();
}

function showAll() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('flip');
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function greenGlow() {
    document.body.classList.add("greenGlow");
}

function redGlow() {
    document.body.classList.add("redGlow");
}


function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            greenGlow();
            setTimeout(function () {
                document.body.classList.remove("greenGlow");
            }, 1500);
        }
    } else {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            redGlow()
            setTimeout(function () {
                document.body.classList.remove("redGlow");
            }, 1000);
        }
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


var link = document.getElementById("back-to-top");
var amountScrolled = 220;

function addClass(el, className) {

    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

window.addEventListener('scroll', function (e) {
    if (window.scrollY > amountScrolled) {
        addClass(link, 'show');
        link.href = "#top";
    } else {
        removeClass(link, 'show');
        link.href = "#memory-game";
    }
});