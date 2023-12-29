const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".box-img img");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-model");



let currentWord,
  wrongGuesses = 0;
const maxGuesses = 6,
  correctLetters = [];


const gameOver = (isvectory) => {
  setTimeout(() => {
    const modalText= isvectory ? "You Found The Word" : "The Correct Word Is : "
    const gameModaltext = document.querySelector(".game-model .content p").innerHTML=`${modalText} <b> ${currentWord} </b>`;
    const gameModalImage =document.querySelector('.game-model .content img').src=`./images/${isvectory ? 'victory' : 'lost'}.gif`;
    const gameModalTitle =document.querySelector('.game-model .content h4').innerText=`${isvectory? 'Congrates' : 'Game Over'}`;
    gameModal.classList.add("show");
  }, 300);
};

const getRandom = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map((char) => `<li class="letter"></li>`)
    .join("");
};
// gameOver(false)
/////start checking from here
const initGame = (button, clickedButton) => {
  if (currentWord.includes(clickedButton)) {
    console.log("the letter exist");
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedButton) {
        correctLetters.push(letter);
        document.querySelectorAll("li")[index].innerHTML = letter;
        document.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    console.log("the letter doesn't exist");
    wrongGuesses++;
    hangmanImage.src = `./images/hangman-${wrongGuesses}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuesses} / ${maxGuesses}`;
  if (wrongGuesses === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
////
const buttons = document.querySelectorAll(".keyboard button");

// Add click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log(this, this.textContent);
    initGame(this, this.textContent);
  });
});

getRandom();
const refresh=()=>{
    window.location.reload();
}