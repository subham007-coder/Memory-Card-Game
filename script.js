let time = 0;
const card = document.querySelectorAll(".card");
const startBtn = document.querySelector(".start");
const moveCounter = document.querySelector(".moveCounter");
const timeUpdate = document.querySelector(".timeUpdate");
const reTry = document.querySelector(".retry");



// start button
startBtn.addEventListener("click", () => {
  console.log("i am start");
  startBtn.style.display = "none";
  timeStart();
});


// retry game
function reTryGame(params) {
  reTry.addEventListener("click", () => {
    time = 0;
  })
}
reTryGame()




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








// flip card

card.forEach((card) => {
  card.addEventListener("click", function () {
    this.querySelector(".card-inner").classList.toggle("is-flipped");
  });
});
