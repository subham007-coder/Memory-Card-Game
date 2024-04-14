let time = 0;
let moves = 0;
const card = document.querySelectorAll(".card");
const startBtn = document.querySelector(".start");
const moveCounter = document.querySelector(".moveCounter");
const timeUpdate = document.querySelector(".timeUpdate");
const reTry = document.querySelector(".retry");
const cardInner = document.querySelectorAll(".card-inner");
const main = document.querySelector("main");
let res = document.querySelector(".res");
// card store array
let flippedCards = [];
let matchedCards = [];


// songs store array
let TumSe = document.getElementById("TumSe");
let Deva = document.getElementById("Deva");
let Ludo = document.getElementById("Ludo");
let MisMatch = document.getElementById("MisMatch");
let Dunki = document.getElementById("Dunki");
let Hasi = document.getElementById("Hasi");
let Heriye = document.getElementById("Heriye");
let Chaleya = document.getElementById("Chaleya");


// Function to flip a card
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    this.querySelector(".card-inner").classList.toggle("is-flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
      moves++; // Increment move counter
      moveCounter.textContent = moves; // Update move counter display
      starSetter();
      gameLose();
    }
  }
}

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
  shuffleDeck();
  playAudio();
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

// Define star-related variables
const starsList = document.querySelectorAll(".helth i");
const solidStar = "fa-solid fa-star";
const emptyStar = "fa-regular fa-star";

// Function to reset stars to their initial state
function resetStars() {
  starsList.forEach((star) => {
    star.className = solidStar; // Assuming all stars should start as solid
  });
}

// Retry button click event listener
reTry.addEventListener("click", resetGame);

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
  matchedCards = [];

  // Remove animations and extra styles
  gsap.set(".card", { clearProps: "all" });

  // Remove 'matched' class from cards
  card.forEach((card) => {
    card.classList.remove("matched");
  });
  
  resetStars();

  shuffleDeck();
  playAudio();
}

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

    // song stopping after match
    setTimeout(() => {
      TumSe.pause();
      Deva.pause();
      Ludo.pause();
      MisMatch.pause();
      Dunki.pause();
      Hasi.pause();
      Heriye.pause();
      Chaleya.pause();
    }, 2500);

    gsap.to(".matched", {
      x: 500,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
      rotate: 360,
      scale: 0.5,
      onComplete: function () {
        setTimeout(() => {
          card1.querySelector(".card-inner").classList.remove("is-flipped");
          card2.querySelector(".card-inner").classList.remove("is-flipped");
        }, 200); // Adjust the delay if needed
      },
    });
  } else {
    // Cards don't match, flip them back
    setTimeout(() => {
      card1.querySelector(".card-inner").classList.toggle("is-flipped");
      card2.querySelector(".card-inner").classList.toggle("is-flipped");
      flippedCards = [];
      // song pause
      TumSe.pause();
      Deva.pause();
      Ludo.pause();
      MisMatch.pause();
      Dunki.pause();
      Hasi.pause();
      Heriye.pause();
      Chaleya.pause();
    }, 250);
  }
  flippedCards = [];
}


// Define star-related variables
// const starsList = document.querySelectorAll(".helth i");
const halfStar = "fa-solid fa-star-half-stroke";
// const emptyStar = "fa-regular fa-star";

// Function to set stars
function starSetter() {
  // Set stars based on the number of moves
  if (moves >= 10 && moves <= 15) {
    starsList[2].className = halfStar;
  } else if (moves >= 16 && moves <= 20) {
    starsList[2].className = emptyStar;
    starsList[1].className = halfStar;
  } else if (moves >= 21 && moves <= 24) {
    starsList[1].className = emptyStar;
  } else if (moves >= 25 && moves <= 28) {
    starsList[0].className = halfStar;
  } else if (moves >= 29) {
    starsList[0].className = emptyStar;
  }
}

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Apply random colors to all card front sides
const cardFronts = document.querySelectorAll(".card-front");

cardFronts.forEach((cardFront) => {
  const randomColor = getRandomColor();
  cardFront.style.backgroundColor = randomColor;
});

// play song on cardFront click
function playAudio() {
  // for TumSe
  document.querySelectorAll("#TumSe").forEach(() => {
    document.querySelectorAll("#A").forEach((a) => {
      // console.log(a);
      a.addEventListener("click", () => {
        TumSe.play();
      });
    });
  });


  // for Deva
  document.querySelectorAll("#Deva").forEach(() => {
    document.querySelectorAll("#B").forEach((b) => {
      // console.log(b);
      b.addEventListener("click", () => {
        Deva.play();
      });
    });
  });
  
  // for Ludo
  document.querySelectorAll("#Ludo").forEach(() => {
    document.querySelectorAll("#C").forEach((c) => {
      // console.log(c);
      c.addEventListener("click", () => {
        Ludo.play();
      });
    });
  });

  // for MisMatch
  document.querySelectorAll("#MisMatch").forEach(() => {
    document.querySelectorAll("#D").forEach((d) => {
      // console.log(d);
      d.addEventListener("click", () => {
        MisMatch.play();
      });
    });
  });

  // for Dunki
  document.querySelectorAll("#Dunki").forEach(() => {
    document.querySelectorAll("#E").forEach((e) => {
      // console.log(e);
      e.addEventListener("click", () => {
        Dunki.play();
      });
    });
  });

  // for Hasi
  document.querySelectorAll("#Hasi").forEach(() => {
    document.querySelectorAll("#F").forEach((f) => {
      // console.log(f);
      f.addEventListener("click", () => {
        Hasi.play();
      });
    });
  });

  // for Heriye
  document.querySelectorAll("#Heriye").forEach(() => {
    document.querySelectorAll("#G").forEach((g) => {
      // console.log(g);
      g.addEventListener("click", () => {
        Heriye.play();
      });
    });
  });

  // for Chaleya
  document.querySelectorAll("#Chaleya").forEach(() => {
    document.querySelectorAll("#H").forEach((h) => {
      // console.log(h);
      h.addEventListener("click", () => {
        Chaleya.play();
      });
    });
  });
}


// Game Lose Function
function gameLose() {

  if (matchedCards.length != card.length && moves == 30) {
    // All cards matched, game over
    console.log("Game Over!");
    // res.innerHTML = "Game Over!";
    res.style.display = "block";

    gsap.to(".res", {
      y: 200,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
      rotate: 360,
      color: "white",
    });
    
    main.style.display = "none";

    let again = document.querySelector(".again");
    again.style.display = "block";
    again.addEventListener("click",() => {
      main.style.display = "block";
      again.style.display = "none";
      res.style.display = "none";
      resetGame();
    });

  }
}
