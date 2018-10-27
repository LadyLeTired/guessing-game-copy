/* 

Write your guess-game code here! Don't forget to look at the test 
specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that 
are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(inputArray){
    let arrayLength = inputArray.length;
    let arrayEnd;
    let i;
  // While there remain elements to shuffle…
    while (arrayLength) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * arrayLength--);

        // And swap it with the current element.
        arrayEnd = inputArray[arrayLength];
        inputArray[arrayLength] = inputArray[i];
        inputArray[i] = arrayEnd;
    }

    return inputArray;
}

class Game {
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        let returnVal = this.playersGuess - this.winningNumber;
        return returnVal < 0 ? returnVal * -1 : returnVal;
    }

    isLower() {
        if(this.playersGuess < this.winningNumber){
            return true;
        } else {
            return false;
        }
    }

    playersGuessSubmission(num) {
        let canSubmit = true;

        if(num < 1 || num > 100){
            canSubmit = false;
            return 'Pick a number between 1 & 100, por favor.'
        } 

        if(isNaN(num)){
            canSubmit = false;
            return `That's not a number, silly.`
        }

        if(canSubmit === true){
            this.playersGuess = num;
            return this.checkGuess();
        }
        
    }

    checkGuess() {

        if(this.playersGuess === this.winningNumber){
            let yaySound = new Audio('yay.mp3');
            yaySound.play();
            return 'You Win!'
        } 

        if(this.pastGuesses.indexOf(this.playersGuess) >= 0){
            return `That's already been guessed! Try another.`
        }

        this.pastGuesses.push(this.playersGuess);

        if(this.pastGuesses.length > 4){
            let sadTrombone = new Audio('sadtrombone.wav')
            sadTrombone.play();
            return 'You Lose. :('
        }

        if(this.difference() < 10){
            if(this.playersGuess > this.winningNumber){
                return `You're burning up! Try a lil' lower.`
            } else {
                return `You're burning up! Try a lil' higher.`
            }
        }

        if(this.difference() < 25){
            if(this.playersGuess > this.winningNumber){
                return `You're lukewarm. Try a lil' lower.`
            } else {
                return `You're lukewarm. Try a lil' higher.`
            }
        }

        if(this.difference() < 50){
            if(this.playersGuess > this.winningNumber){
                return `You're a bit chilly. Try lower.`
            } else {
                return `You're a bit chilly. Try higher.`
            }
        }

        if(this.difference() < 100){
            if(this.playersGuess > this.winningNumber){
                return `You're ice cold! Try much lower.`
            } else {
                return `You're ice cold! Try much higher.`
            }
        }
        
    }

    provideHint(){
        let output = [this.winningNumber];

        while(output.length < 3){
            output.push(generateWinningNumber());
        }

        return shuffle(output);
    }
}

function newGame(){
    location.reload();
    return new Game;
}

let gameStart = new Game;
gameStart.winningNumber; //generates a winning number as soon as the page loads
console.log(gameStart.winningNumber)
console.log(gameStart.winningNumber)

let guessBox = document.getElementById('guess-box');
const submitButton = document.getElementById('submit-button');
const playAgainButton = document.getElementById('play-again');
const hintButton = document.getElementById('hint-button');

let previousGuessBox1 = document.getElementById('guess1');
let previousGuessBox2 = document.getElementById('guess2');
let previousGuessBox3 = document.getElementById('guess3');
let previousGuessBox4 = document.getElementById('guess4');

let dialog = document.getElementById('dialog')

let guessCounter = 0;


function grabInput(inputEl){
    //acquire the user's input using the value property
    //store that input in a previous guess field
    //clear the input field
    
    guessCounter++;
    if(guessCounter === 1){
        previousGuessBox1.value = inputEl.value;
        guessBox.value = '';
    }
    if(guessCounter === 2){
        previousGuessBox2.value = inputEl.value;
        guessBox.value = '';
    }
    if(guessCounter === 3){
        previousGuessBox3.value = inputEl.value;
        guessBox.value = '';
    }
    if(guessCounter === 4){
        previousGuessBox4.value = inputEl.value;
        guessBox.value = '';
    }

}

submitButton.addEventListener('click', function(){
    
    //whatever is in the input box at the time that submit is clicked
    const inputElement = document.querySelector('.guessing-area input') 
    //takes css-style selectors as an argument
    //returns the first element within the document that matches
    //the specified selector
    
    let inputText = Number(inputElement.value);

    if(!isNaN(inputText) && inputText >= 1 && inputText <= 100 && gameStart.pastGuesses.indexOf(inputText) === -1){
        grabInput(inputElement); //this places the guesses in their boxes...
    } else {
        guessBox.value = '';
    }

    dialog.textContent = gameStart.playersGuessSubmission(inputText);

});

playAgainButton.addEventListener('click', function(){
    newGame();
})

hintButton.addEventListener('click', function(){
    //give the user a hint
    dialog.textContent = (`The winning number is one of the following: ${gameStart.provideHint()}`);
    
});