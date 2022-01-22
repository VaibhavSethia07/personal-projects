let player = {
    name: "Vaibhav Sethia",
    chips: 135
};
let cards = [];
let cardsSum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let cardsEl = document.getElementById("cards-el");
let sumEl = document.querySelector("#sum-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

window.getRandomCard = function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13 + 1);
    if (randomNumber == 1)
        return 11;
    if (randomNumber >= 11)
        return 10;
    return randomNumber;
}

window.startGame = function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    cardsSum = cards[0] + cards[1];
    renderGame();

}

window.renderGame = function renderGame() {
    cardsEl.textContent = "Cards: ";
    let len = cards.length;
    for (let card = 0; card < len; card++) {
        cardsEl.textContent += cards[card] + " ";
    }
    sumEl.textContent = "Sum: " + cardsSum;

    if (cardsSum <= 20)
        message = "Do you want to draw another card?";
    else if (cardsSum === 21) {
        message = "Wohoo! You've go Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = true;
    }
    messageEl.textContent = message;
}

window.newCard = function newCard() {
    if (!isAlive || hasBlackJack)
        return;
    let card = getRandomCard();
    cards.push(card);
    cardsSum += card;
    renderGame();
}

