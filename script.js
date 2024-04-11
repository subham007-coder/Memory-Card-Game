let time = 0;
let moves = 0;
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

  gsap.from(".card", {
    duration: 0.5,
    opacity: 0,
    ease: "power1.inOut",
    stagger: 0.1,
  });

  // Enable card flipping
  card.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
});

// Function to shuffle the deck of cards
function shuffleDeck() {
  // Get all the card elements
  const cards = document.querySelectorAll(".card");

  // Convert NodeList to array
  const cardArray = Array.from(cards);

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardArray[i].innerHTML, cardArray[j].innerHTML] = [
      cardArray[j].innerHTML,
      cardArray[i].innerHTML,
    ];
  }

  // Append the shuffled cards back to the deck
  cardArray.forEach((card, index) => {
    cards[index].innerHTML = card.innerHTML;
  });
}

// Reset game function
function resetGame() {
  // Reset time
  time = 0;
  timeUpdate.innerHTML = "0:00";

  // Reset move counter
  moves = 0;
  moveCounter.textContent = "0";

  // Reset flipped cards array
  flippedCards = [];

  // Reset card flips
  cardInner.forEach((inner) => {
    inner.classList.remove("is-flipped");
    inner.parentNode.classList.remove("matched");
    gsap.set(inner.parentNode, { clearProps: 'all' }); // Clear any GSAP properties
  });


  shuffleDeck();
}

// Retry button click event listener
reTry.addEventListener("click", resetGame);

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

// Function to flip a card
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    this.querySelector(".card-inner").classList.toggle("is-flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
      moves++; // Increment move counter
      moveCounter.textContent = moves; // Update move counter display
    }
  }
}

// Check if cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const id1 = card1.querySelector(".card-front").id;
  const id2 = card2.querySelector(".card-front").id;

  if (id1 === id2) {
    matchedCards.push(id1, id2);
    if (matchedCards.length === card.length) {
      // All cards matched, game over
      console.log("Game Winner!");
    }
    console.log("Box match"); // Log when two cards match

    // Add extra style for better UX match Card
    card1.classList.add("matched");
    card2.classList.add("matched");

    gsap.to(".matched", {
      x: 700,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
      rotate: 360,
      scale: 0.5,
      stagger: 0.5,
    });
  } else {
    // Cards don't match, flip them back
    setTimeout(() => {
      card1.querySelector(".card-inner").classList.toggle("is-flipped");
      card2.querySelector(".card-inner").classList.toggle("is-flipped");
      flippedCards = [];
    }, 1000);
  }
  flippedCards = [];
}
