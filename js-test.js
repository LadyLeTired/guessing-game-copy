// alert();
// function getTitle(){
//     let instructions = document.getElementById('test-id');
//     let firstButton = document.querySelector('button')
//     console.log(firstButton);
//     console.log(instructions)
//     console.log(instructions.innerHTML)
//     console.log(instructions.nodeName);
//     console.log(instructions.nodeType);
//     console.log(instructions.textContent)
// }

// getTitle();

let guessBox = document.getElementById('guess-box');
const submitButton = document.getElementById('submit-button');
const playAgainButton = document.getElementById('play-again');
const hintButton = document.getElementById('hint-button');

let previousGuessBox1 = document.getElementById('guess1');
let previousGuessBox2 = document.getElementById('guess2');
let previousGuessBox3 = document.getElementById('guess3');
let previousGuessBox4 = document.getElementById('guess4');

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
    if(guessCounter >= 5){
        alert('No more guesses remain. :(')
    }

}

submitButton.addEventListener('click', function(){
    
    const inputElement = document.querySelector('.guessing-area input') 
        //takes css-style selectors as an argument
        //returns the first element within the document that matches
            //the specified selector

    grabInput(inputElement);
});

playAgainButton.addEventListener('click', function(){
    //refresh the page?
    alert('The page should refresh.')
});

hintButton.addEventListener('click', function(){
    //give the user a hint
    alert(`I'll give you a hint.`)
});