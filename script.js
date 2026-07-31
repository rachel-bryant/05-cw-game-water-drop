// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let timeInt;
let points = 0;
let time = 5;
let drops = [];

const score = document.getElementById("score");
const timer = document.getElementById("time");
const endScreen = document.getElementById("end-screen");
const disPoints = document.getElementById("points");

// Wait for button click to start the game
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  startBtn.disabled = false;
  startBtn.style.backgroundColor = "#4CAF50";
  endScreen.style.display = "none";

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(generateDrop, 1000);

  // decrease timer
  timeInt = setInterval(function() {
    time--;
    timer.innerText = time;
    if (time == 0) {
      clearInterval(timeInt);
      clearInterval(dropMaker);
      startBtn.disabled = true;
      startBtn.style.backgroundColor = "#d0d0d0";
      displayEndScreen();
      points = 0;
      score.innerText = points;
      time = 30;
      timer.innerText = time;
      gameRunning = false;
    }
  }, 1000);
}

function generateDrop() {
  const goodDrop = Math.random() > 0.35;

  if (goodDrop) {
    createDrop();
  } else {
    createBadDrop();
  }
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  const dropPoints = Math.round(size/20); // points for each drop is calculated using the drop's size rounded to the nearest int
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);
  drops.push(drop);

  // when a drop is clicked, remove it, and add 
  drop.addEventListener("click", () => {
    points += dropPoints;
    score.innerText = points;
    drop.remove();
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

function createBadDrop() {
    // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "bad-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  const dropPoints = Math.round(size/20); // points lost for each drop is calculated using the drop's size rounded to the nearest int
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);
  drops.push(drop);

  // when a drop is clicked, remove it, and add 
  drop.addEventListener("click", () => {
    if (points - dropPoints >= 0) {
      points -= dropPoints;
    } else {
      points = 0;
    }
    score.innerText = points;
    drop.remove();
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

function displayEndScreen() {
  disPoints.innerText = points; 
  endScreen.style.display = "block";
}