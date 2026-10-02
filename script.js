/* =========================================
   DOM ELEMENTS
========================================= */

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetBtn");
const resetScoreButton = document.getElementById("resetScoreBtn");
const themeButton = document.getElementById("themeBtn");
const soundButton = document.getElementById("soundBtn");
const gameMode = document.getElementById("gameMode");
const difficulty = document.getElementById("difficulty");
const difficultyContainer = document.getElementById("difficultyContainer");
const playerXName = document.getElementById("playerXName");
const playerOName = document.getElementById("playerOName");
const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");
const playerXCard = document.getElementById("playerXCard");
const playerOCard = document.getElementById("playerOCard");

/* =========================================
   GAME STATE
========================================= */

let board = [
  "","","",
  "","","",
  "","",""
];
let currentPlayer = "X";
let gameIsActive = true;
let aiThinking = false;

/* =========================================
   SCORE
========================================= */

let scores = {X: 0, O: 0, draw: 0};

/* =========================================
   SETTINGS
========================================= */

let soundEnabled = true;
let isDarkMode = false;

/* =========================================
   WINNING PATTERNS
========================================= */

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/* =========================================
   AUDIO
========================================= */

let audioContext = null;

/*
  Browser audio normally requires a user
  interaction before it can play.
*/

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(frequency,duration = 0.1,type = "sine") {
  if (!soundEnabled) return;
  initAudio();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.15,audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001,audioContext.currentTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

/* Move sound */
function playMoveSound() {
  playSound(500, 0.08, "sine");
}

/* Win sound */
function playWinSound() {
  if (!soundEnabled) return;
  initAudio();
  playSound(523, 0.12);
  setTimeout(() => playSound(659, 0.12),100);
  setTimeout(() => playSound(784, 0.2),200);
}

/* Draw sound */
function playDrawSound() {
  playSound(300, 0.2, "triangle");
}

/* =========================================
   PLAYER NAMES
========================================= */

function getPlayerName(player) {
  if (player === "X") {
    return (playerXName.value.trim() || "Player X");
  }
  if (gameMode.value === "ai") {
    return "Computer";
  }
  return (playerOName.value.trim() || "Player O");
}

/* =========================================
   STATUS
========================================= */

function showStatus(message) {
  statusText.textContent = message;
}

/* =========================================
   ACTIVE PLAYER CARD
========================================= */

function updateActivePlayer() {
  playerXCard.classList.remove("active");
  playerOCard.classList.remove("active");
  if (currentPlayer === "X") {
    playerXCard.classList.add("active");
  } else {
    playerOCard.classList.add("active");
  }
}

/* =========================================
   CHECK WIN
========================================= */

function getWinningPattern(currentBoard = board) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
      return pattern;
    }
  }
  return null;
}

/* =========================================
   CHECK DRAW
========================================= */

function checkDraw(currentBoard = board) {
  return currentBoard.every((cell) => cell !== "");
}

/* =========================================
   EMPTY CELLS
========================================= */

function getEmptyCells(currentBoard = board) {
  return currentBoard.map((cell, index) => cell === "" ? index : null).filter((index) => index !== null);
}

/* =========================================
   DISPLAY MOVE
========================================= */

function displayMove(index, player) {
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.remove("move");
  cell.classList.add(player.toLowerCase());

  /*
    Force browser reflow so animation
    can replay for every move.
  */

  void cell.offsetWidth;
  cell.classList.add("move");
}

/* =========================================
   END GAME
========================================= */

function finishGame(winningPattern = null) {
  gameIsActive = false;
  aiThinking = false;
  if (winningPattern) {
    const winner = board[winningPattern[0]];
    const winnerName = getPlayerName(winner);
    scores[winner]++;
    updateScores();
    winningPattern.forEach((index) => {
        cells[index].classList.add("winner");
      }
    );

    statusText.className = "winner";
    showStatus(`🎉 ${winnerName} wins!`);
    playWinSound();
  }

  else {
    scores.draw++;
    updateScores();
    statusText.className = "draw";
    showStatus("🤝 It's a draw!");
    playDrawSound();
  }
}

/* =========================================
   CHECK GAME RESULT
========================================= */

function checkGameResult() {
  const winningPattern = getWinningPattern();

  if (winningPattern) {
    finishGame(winningPattern);
    return true;
  }

  if (checkDraw()) {
    finishGame();
    return true;
  }
  return false;
}

/* =========================================
   SWITCH PLAYER
========================================= */

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateActivePlayer();
  showStatus(`It's ${getPlayerName(currentPlayer)}'s turn`);
}

/* =========================================
   HUMAN MOVE
========================================= */

function makeMove(index) {
  if (!gameIsActive) return;
  if (aiThinking) return;
  if (board[index] !== "") return;
  board[index] = currentPlayer;
  displayMove(index,currentPlayer);
  playMoveSound();
  if (checkGameResult()) {
    return;
  }

  switchPlayer();
  
  /*
    If AI mode and it is O's turn,
    let the computer play.
  */

  if (gameMode.value === "ai" && currentPlayer === "O" && gameIsActive) {
    aiThinking = true;
    showStatus("🤖 Computer is thinking...");
    setTimeout(makeAIMove,450);
  }
}

/* =========================================
   AI MOVE
========================================= */

function makeAIMove() {
  if (!gameIsActive) {
    aiThinking = false;
    return;
  }

  let move;
  if (difficulty.value === "easy") {
    move = getRandomMove();
  }

  else if (difficulty.value === "medium") {
    move = getMediumMove();

  }
  else {
    move = getBestMove();
  }

  if (move !== undefined) {
    board[move] = "O";
    displayMove(move, "O");
    playMoveSound();
  }
  aiThinking = false;
  if (checkGameResult()) {
    return;
  }
  switchPlayer();
}

/* =========================================
   EASY AI
========================================= */

function getRandomMove() {
  const emptyCells = getEmptyCells();
  if (emptyCells.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

/* =========================================
   MEDIUM AI
========================================= */

function getMediumMove() {

  /*
    70% of the time:

    1. Try to win.
    2. Block the player.
    3. Take center.
    4. Take corner.

    Otherwise make a random move.
*/

  if (Math.random() < 0.7) {
    const winningMove = findWinningMove("O");
    if (winningMove !== undefined) {
      return winningMove;
    }

    const blockingMove = findWinningMove("X");

    if (blockingMove !== undefined) {
      return blockingMove;
    }

    if (board[4] === "") {
      return 4;
    }

    const corners = [0,2,6,8].filter((index) =>
        board[index] === ""
    );

    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
  }
  return getRandomMove();
}

/* =========================================
   FIND WINNING MOVE
========================================= */

function findWinningMove(player) {
  const emptyCells = getEmptyCells();
  for (const index of emptyCells) {
    const testBoard = [...board];
    testBoard[index] = player;
    if (getWinningPattern(testBoard)) {
      return index;
    }
  }
  return undefined;
}

/* =========================================
   HARD AI - MINIMAX
========================================= */

function getBestMove() {
  let bestScore = -Infinity;
  let move;
  const emptyCells = getEmptyCells();

  for (const index of emptyCells) {
    const testBoard = [...board];
    testBoard[index] = "O";
    const score = minimax(testBoard,false);

    if (score > bestScore) {
      bestScore = score;
      move = index;
    }
  }
  return move;
}

/* =========================================
   MINIMAX
========================================= */

function minimax(currentBoard,isMaximizing) {
  const winningPattern = getWinningPattern(currentBoard);

  if (winningPattern) {
    const winner = currentBoard[winningPattern[0]];

    if (winner === "O") {
      return 10;
    }
    if (winner === "X") {
      return -10;
    }
  }

  if (checkDraw(currentBoard)) {
    return 0;
  }

  const emptyCells = getEmptyCells(currentBoard);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of emptyCells) {
      currentBoard[index] = "O";
      const score = minimax(currentBoard,false);
      currentBoard[index] = "";
      bestScore = Math.max(bestScore,score);
    }
    return bestScore;
  }

  else {
    let bestScore = Infinity;
    for (const index of emptyCells) {
      currentBoard[index] = "X";
      const score = minimax(currentBoard,true);
      currentBoard[index] = "";
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

/* =========================================
   UPDATE SCORES
========================================= */

function updateScores() {
  xScoreText.textContent = scores.X;
  oScoreText.textContent = scores.O;
  drawScoreText.textContent = scores.draw;
}

/* =========================================
   RESET BOARD
========================================= */

function resetBoard() {

  board = [
    "","","",
    "","","",
    "","",""
  ];

  currentPlayer = "X";
  gameIsActive = true;
  aiThinking = false;
  statusText.className = "";

  cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "move", "winner");
    }
  );

  updateActivePlayer();
  showStatus(`It's ${getPlayerName("X")}'s turn`);
  /* If player chooses AI mode, human X always starts. */
}

/* =========================================
   RESET EVERYTHING
========================================= */

function resetScores() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScores();
  resetBoard();
}

/* =========================================
   GAME MODE
========================================= */

function updateGameMode() {
  if (gameMode.value === "ai") {
    difficultyContainer.classList.remove("hidden");

    /* In AI mode, O is controlled by the computer. */
    playerOName.value = "Computer";
    playerOName.disabled = true;
  }

  else {
    difficultyContainer.classList.remove("hidden");

    /* Difficulty is not needed in two-player mode. */
    difficultyContainer.classList.add("hidden");
    playerOName.disabled = false;

    if (playerOName.value === "Computer") {
      playerOName.value = "Player O";
    }
  }
  resetBoard();
}

/* =========================================
   THEME
========================================= */

function updateThemeButton() {
  if (isDarkMode) {
    themeButton.textContent = "☀️";
    themeButton.title = "Switch to light mode";
  }
  else {
    themeButton.textContent = "🌙";
    themeButton.title = "Switch to dark mode";
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark",isDarkMode);
  updateThemeButton();
  /* Store theme preference */
  localStorage.setItem("ticTacToeTheme", isDarkMode ? "dark" : "light");
}

/* =========================================
   LOAD THEME
========================================= */

function loadTheme() {
  const savedTheme = localStorage.getItem("ticTacToeTheme");
  if (savedTheme === "dark") {
    isDarkMode = true;
    document.body.classList.add("dark");
  }
  updateThemeButton();
}

/* =========================================
   SOUND TOGGLE
========================================= */

function updateSoundButton() {
  if (soundEnabled) {
    soundButton.textContent = "🔊 Sound On";
  }
  else {
    soundButton.textContent = "🔇 Sound Off";
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundButton();
}

/* =========================================
   NAME UPDATE
========================================= */

function updatePlayerNames() {
  if (gameIsActive && !aiThinking) {
    showStatus(`It's ${getPlayerName(currentPlayer)}'s turn`);
  }
}

/* =========================================
   CELL EVENT LISTENERS
========================================= */

cells.forEach((cell) => {
    cell.addEventListener("click",() => {
        const index = Number(cell.dataset.index);

        /* In AI mode, prevent the user from playing as O.*/
        if (gameMode.value === "ai" && currentPlayer === "O") {
          return;
        }
        makeMove(index);
      }
    );
  }
);

/* =========================================
   BUTTON EVENTS
========================================= */

resetButton.addEventListener("click", () => {
    playSound(350,0.08,"triangle");
    resetBoard();
  }
);

resetScoreButton.addEventListener("click", () => {
    playSound(250,0.08,"triangle");
    resetScores();
  }
);

themeButton.addEventListener("click",toggleTheme);
soundButton.addEventListener("click",() => {
    initAudio();
    toggleSound();
  }
);

gameMode.addEventListener("change",updateGameMode);
difficulty.addEventListener("change",resetBoard);
playerXName.addEventListener("input",updatePlayerNames);
playerOName.addEventListener("input",updatePlayerNames);

/* =========================================
   INITIALIZATION
========================================= */

function initializeGame() {
  loadTheme();
  updateSoundButton();
  updateScores();
  updateGameMode();
  resetBoard();
}

initializeGame();