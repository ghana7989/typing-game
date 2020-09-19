const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

//Init Word
let randomWord;

// Init Score

let score = 0;

// Init Time
let time = 15;
// Set difficulty to default medium or else grab from localStorage
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";
difficultySelect.value = difficulty

// Generates Random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length) - 1]

}

// Add Word to DOM
function addWordToDOM() {
  randomWord = getRandomWord()
  word.innerHTML = randomWord
}
function updateScore(word) {
  score = score + word.length
  scoreEl.innerHTML = score
}
function decreaseScore(randomWord) {
  if (score > randomWord.length) {
    score = score - randomWord.length
    scoreEl.innerHTML = score;
  }
}
function updateTime() {
  time--;
  timeEl.innerHTML = time + " s"
  if (time === 0) {
    clearInterval(timeInterval)

    gameOver()
  }
}
function gameOver() {
  endgameEl.innerHTML = `
    <h1>You Ran Out Of Time Babai</h1>
    <p>Your Final Score is ${score}</p>
    <button onClick="location.reload()">Play Again</button>
  `
  endgameEl.style.display = "flex"
}
addWordToDOM()

text.focus()
// Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Text Listener
text.addEventListener("input", e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM()
    updateScore(insertedText)
    e.target.value = ""
    if (difficulty === "hard") {
      time += 3;
    } else if (difficulty === "medium") {
      time += 4
    } else {
      time += 6
    }
    updateTime()
  }
  if (insertedText.length === randomWord.length && insertedText !== randomWord) {
    decreaseScore(randomWord)
  }
})
// settings btn onClick

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide")
})
// Settings Select

settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty)
})