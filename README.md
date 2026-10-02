# 🎮 Tic Tac Toe

A modern and interactive **Tic Tac Toe** game built using **HTML, CSS, and JavaScript**. The game supports both two-player and single-player modes, multiple AI difficulty levels, score tracking, sound effects, animations, player customization, responsive design, and dark/light mode.

---

## ✨ Features

* 🎮 Two-player mode
* 🤖 Single-player mode with AI
* 🎯 Three AI difficulty levels:

  * Easy
  * Medium
  * Hard
* 🏆 Score tracking for:

  * Player X
  * Player O / Computer
  * Draws
* 🔊 Sound effects
* 🎨 Move and winning animations
* 📱 Responsive design for mobile and tablet devices
* 👤 Custom player names
* 🌙 Dark mode
* ☀️ Light mode
* 🔄 New Round functionality
* 🗑️ Reset Scores functionality
* 🏅 Winning-cell highlighting
* 🚫 Prevents invalid moves
* 💾 Theme preference stored using Local Storage

---

## 🛠️ Technologies Used

* **HTML5** – Structure of the game
* **CSS3** – Styling, animations, themes, and responsive design
* **JavaScript (ES6+)** – Game logic, AI, scoring, sound effects, and interactivity
* **Web Audio API** – Generates game sound effects
* **Local Storage** – Stores the selected theme

---

## 📂 Project Structure

```text
Tic-Tac-Toe/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🎮 Game Modes

### 👥 Two Players

Two players can play against each other on the same device.

```text
Player X → Player O → Player X → ...
```

Player names can be customized before or during the game.

---

### 🤖 Play with AI

In single-player mode:

```text
You       → X
Computer  → O
```

Player X always starts the game.

The computer automatically makes its move after the player's turn.

---

## 🎯 AI Difficulty Levels

### 🟢 Easy

The computer selects an available cell randomly.

### 🟡 Medium

The computer uses basic game strategy:

1. Try to win.
2. Block the player's winning move.
3. Choose the center.
4. Choose a corner.
5. Otherwise make a random move.

### 🔴 Hard

The computer uses the **Minimax algorithm** to evaluate possible game states and select its move.

This provides a much more strategic AI opponent.

---

## 🏆 Score Tracking

The game keeps track of:

| Result   | Description                       |
| -------- | --------------------------------- |
| Player X | Number of rounds won by X         |
| Player O | Number of rounds won by O         |
| Draws    | Number of rounds ending in a draw |

### New Round

The **New Round** button:

* Clears the current board
* Starts a new game
* Keeps the existing scores

### Reset Scores

The **Reset Scores** button:

* Resets Player X score
* Resets Player O score
* Resets draw count
* Starts a new round

---

## 👤 Player Name Customization

Players can enter custom names instead of using the default names.

For example:

```text
Player X → Avneel
Player O → Rahul
```

The game status will then display:

```text
It's Avneel's turn
```

and after winning:

```text
🎉 Rahul wins!
```

When playing against the AI, Player O is automatically named:

```text
Computer
```

---

## 🔊 Sound Effects

The game includes sound effects generated using the **Web Audio API**.

Sounds are played for:

* Player moves
* Winning
* Draws
* Button interactions

The sound can be enabled or disabled using the:

```text
🔊 Sound On
```

button.

When disabled:

```text
🔇 Sound Off
```

No external audio files are required.

---

## 🎨 Animations

The game includes several visual animations:

### Move Animation

A player's X or O symbol smoothly appears on the board.

### Winning Animation

The winning cells are highlighted and animated.

### Status Animation

Winner and draw messages receive a visual pop animation.

---

## 🌙 Dark / Light Mode

The game supports both:

### ☀️ Light Mode

A bright interface suitable for daytime use.

### 🌙 Dark Mode

A darker interface suitable for low-light environments.

The selected theme is stored using **Local Storage**, so the preference remains after refreshing the page.

---

## 📱 Responsive Design

The game is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The board automatically adjusts its size according to the available screen width.

The layout also changes for smaller screens to make the controls easier to use.

---

## 🕹️ How to Play

### Two-Player Mode

1. Select **Two Players**.
2. Enter player names if desired.
3. Player X starts.
4. Click an empty cell.
5. Player O takes the next turn.
6. Continue until one player wins or the game ends in a draw.

### AI Mode

1. Select **Play with AI**.
2. Select a difficulty level.
3. Enter your name.
4. Player X starts.
5. Make your move.
6. The computer automatically responds.
7. Continue until the game ends.

---

## 🏅 Winning Conditions

A player wins when they place three identical symbols in:

### Row

```text
X | X | X
---------
  | O |  
---------
  |   |
```

### Column

```text
X | O |
---------
X |   |
---------
X |   |
```

### Diagonal

```text
X | O |
---------
  | X |
---------
  |   | X
```

There are **8 possible winning combinations**:

* 3 rows
* 3 columns
* 2 diagonals

---

## 🚀 How to Run

No additional libraries or dependencies are required.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd Tic-Tac-Toe
```

### 3. Open the Game

Open:

```text
index.html
```

in any modern web browser.

You can also use **VS Code Live Server** for development.

---

## 🌐 Browser Support

The project works in modern browsers that support:

* HTML5
* CSS3
* JavaScript ES6+
* Web Audio API
* Local Storage

Recommended browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## 👨‍💻 Author

**Avneel Singh**

---

## 📄 License

This project is created for learning and educational purposes.
