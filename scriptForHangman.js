
let video_game_titles = [
    "SUPER MARIO ODYSSEY",
    "PACMAN",
    "THE LAST OF US",
    "RED DEAD REDEMPTION",
    "LEAGUE OF LEGENDS",
    "SUPER SMASH BROS ULTIMATE",
    "MINECRAFT",
    "ROCKET LEAGUE",
    "PONG",
    "SPACE INVADERS",
    "DESTINY",
    "LITTLE BIG PLANET",
    "TETRIS",
    "OUTRUN",
    "DUCK HUNT",
    "DOOM",
    "YAKUZA LIKE A DRAGON",
    "UNCHARTED",
    "FORZA HORIZON"
];

let wordToGuess = " ";
let totalWrongGuesses = 10;
let wrongGuesses = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    wordToGuess = video_game_titles[Math.floor(Math.random() * video_game_titles.length)];
}

function generateButtons() {

   // Got this denotation from Simon Suh on YouTube and GitHub. I decided to also add a whitespace to it too.

    document.getElementById('keyboard').innerHTML = " abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase()
        .split('').map(letter =>
        `
      <button
        title="Use these letters and the blank button to guess the right name for the video game" 
        class="btn-floating btn-small waves-effect waves-light indigo " id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

}

function handleGuess(letterChose) {

    guessed.indexOf(letterChose) === -1 ? guessed.push(letterChose) : null;
    document.getElementById(letterChose).setAttribute('disabled', true);

    if (wordToGuess.indexOf(letterChose) >= 0) {
        wordGuessed();
        winner();
    } else if (wordToGuess.indexOf(letterChose) === -1) {
        wrongGuesses++;
        loser();
        updateWrongGuesses();
        updateHangmanPicture();

    }
}

function updateHangmanPicture() {
    document.getElementById("hangmanPic").src = "./images/" + wrongGuesses + ".jpg";
}

function winner() {
    if (wordStatus === wordToGuess) {
        const winMsg="Congratulations! You Won!";
        document.getElementById("text").style.display="none"
        document.getElementById("aLittleNote").style.display="none"
        document.getElementById("keyboard").innerHTML = winMsg.fontsize(6).fontcolor("green");
    }
}

function loser() {
    if (wrongGuesses === totalWrongGuesses) {
        const loseMsg= "GAME OVER! You Lost!!!"
        document.getElementById("text").style.display="none"
        document.getElementById("aLittleNote").style.display="none"
        document.getElementById("keyboard").innerHTML =loseMsg.fontsize(6).fontcolor("red") ;
        document.getElementById("wordChosen").innerHTML = "The name of the video game was  " + wordToGuess
    }
}

function wordGuessed() {
    wordStatus = wordToGuess.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("wordChosen").innerHTML = wordStatus;
}

function updateWrongGuesses() {
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses;
}



function reset() {
    document.getElementById("text").style.display="block"
    document.getElementById("aLittleNote").style.display="block"
    wrongGuesses = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "./images/0.jpg";
    randomWord();
    wordGuessed();
    updateWrongGuesses();
    generateButtons();
}

document.getElementById("totalWrongGuesses").innerHTML = totalWrongGuesses;

randomWord();
generateButtons();
wordGuessed();

