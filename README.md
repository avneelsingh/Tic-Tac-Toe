# 🎮 Tic Tac Toe

A modern and interactive **Tic Tac Toe** web game with AI gameplay, multiple difficulty levels, sound effects, animations, score tracking, player customization, and responsive design.

## 🌐 Live Demo

**Play the game online:**
👉 [Tic Tac Toe — Live Demo](https://awesome-tic-tac-toe-verse.netlify.app/)

## ✨ Features

* 👥 Two-player mode
* 🤖 Single-player mode with AI
* 🎯 Three AI difficulty levels:

  * Easy
  * Medium
  * Hard
* 🧠 Hard mode uses the **Minimax algorithm**
* 🏆 Score tracking for both players
* 🔄 New Round and Reset Scores options
* 🔊 Sound effects with sound toggle
* ✨ Move and winner animations
* 📱 Fully responsive design for mobile devices
* 👤 Player name customization
* 🌙 Dark/Light mode
* 💾 Theme preference stored using `localStorage`
* 🟩 Winning cells highlighted
* 🚫 Invalid moves prevented
* 🎨 Modern and clean UI

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript**
* **Web Audio API**
* **LocalStorage**
* **Minimax Algorithm**

## 📁 Project Structure

```text
Tic-Tac-Toe/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🎮 Game Modes

### 👥 Two Players

Two players can play against each other on the same device.

### 🤖 Play with AI

Play against the computer with three different difficulty levels.

## 🧠 AI Difficulty Levels

### 🟢 Easy

The AI makes random valid moves.

### 🟡 Medium

The AI uses basic strategies such as:

* Winning when possible
* Blocking the player's winning move
* Choosing the center
* Choosing corners
* Making random moves when no strategic move is available

### 🔴 Hard

The AI uses the **Minimax algorithm** to evaluate possible moves and select the optimal move.

## 🏆 Score Tracking

The game keeps track of:

* Player X wins
* Player O / Computer wins
* Draws

The **New Round** button starts another round while preserving the scores.

The **Reset Scores** button resets the complete scoreboard.

## 👤 Player Name Customization

Players can enter their own names before starting the game.

In AI mode, the second player is automatically assigned as **Computer**.

## 🔊 Sound Effects

The game provides sound feedback for different actions, including:

* Player moves
* Winning moves
* Draws
* Button interactions

A sound toggle is available to enable or disable game sounds.

## ✨ Animations

The game includes animations for:

* Player moves
* Winning cells
* Game results
* UI interactions

## 🌙 Dark / Light Mode

Users can switch between:

* ☀️ Light Mode
* 🌙 Dark Mode

The selected theme is saved using `localStorage`, so it remains available when the page is refreshed.

## 📱 Responsive Design

The interface adapts to different screen sizes, including:

* Desktop
* Tablet
* Mobile

The game board and controls automatically adjust for smaller screens.

## ▶️ How to Play

1. Open the game.
2. Select **Two Players** or **Play with AI**.
3. If playing against AI, select a difficulty level.
4. Enter player names.
5. Player X starts the game.
6. Click an empty cell to make a move.
7. Get three of your symbols in a row to win.
8. Use **New Round** to play again.

## 🏁 Winning Conditions

A player wins by placing three identical symbols in:

* A horizontal row
* A vertical column
* A diagonal

There are **8 possible winning combinations** on the 3×3 board.

## 🚀 Run Locally

No additional libraries or dependencies are required.

Clone the repository:

```bash
git clone https://github.com/avneelsingh/Tic-Tac-Toe
```

Navigate to the project directory:

```bash
cd Tic-Tac-Toe
```

Open `index.html` in your browser.

Alternatively, use **VS Code Live Server** for a better development experience.

## 🌐 Live Website

You can play the deployed version here:

👉 **https://awesome-tic-tac-toe-verse.netlify.app/**

## 👨‍💻 Author

**Avneel Singh**

## 📄 License

This project is open-source and available for educational and personal use.
