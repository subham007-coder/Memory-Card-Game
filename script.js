let time = 0;
const card = document.querySelectorAll(".card");
const startBtn = document.querySelector(".start");
const moveCounter = document.querySelector(".moveCounter");
const timeUpdate = document.querySelector(".timeUpdate");
const reTry = document.querySelector(".retry");
const cardInner = document.querySelectorAll(".card-inner");
const main = document.querySelector("main");

let flippedCards = [];
let matchedCards = [];

// Start button
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  timeStart();
});

// Retry game
reTry.addEventListener("click", () => {
  time = 0;
});

// Time update
function timeStart() {
  setInterval(() => {
    time += 1;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeUpdate.innerHTML = formattedTime;
  }, 1000);
}

// Flip card
card.forEach((card) => {
  card.addEventListener("click", function () {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      card.querySelector(".card-inner").classList.toggle("is-flipped");
      flippedCards.push(card);
      
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  });
});

// Check if cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const id1 = card1.querySelector(".card-front").id;
  const id2 = card2.querySelector(".card-front").id;
  
  if (id1 === id2) {
    matchedCards.push(id1, id2);
    if (matchedCards.length === card.length) {
      // All cards matched, game over
      console.log("Game Over!");
    }
  } else {
    // Cards don't match, flip them back
    setTimeout(() => {
      card1.querySelector(".card-inner").classList.toggle("is-flipped");
      card2.querySelector(".card-inner").classList.toggle("is-flipped");
      flippedCards = [];
    }, 1000);
  }
}
