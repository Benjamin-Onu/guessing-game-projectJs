const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//This variable has to be global , will be modified with user input
let secretNumber;

let randomInRange = function(lowerBound, upperBound){
  let min = Math.ceil(lowerBound);
  let max = Math.floor(upperBound);
  return Math.floor(Math.random() * (max - min + 1) + min); 
  // The maximum is inclusive and the minimum is inclusive
}

let checkGuess = function(num){
  let number = Number(num);
  if(number > secretNumber){
    console.log("Too high.")
    return false;
  } else if(number < secretNumber){
    console.log("Too low.")
    return false;
  } else if(number == secretNumber){
    console.log("Correct!\nYOU WON.")
    return true;
  } else{
    console.log("Wrong input")
    return false;
  }
  
}
let askGuess = function(){
  rl.question("Enter a guess: ", checkGuess);
}
function intervalCount(cb, delay, amount) {
  // Your code here
  const intervalObj = setInterval(() => {
    cb();
    amount--;
    if(amount === 0){
        clearInterval(intervalObj);
    }
  }, delay);
}

let askRange = function(){
  rl.question("Enter a max number: ", (max) => {
    rl.question("Enter a min number: ", (min) => {
      console.log(`I'm thinking of a number between ` + min + ` and ` + max + `...`);
      secretNumber = randomInRange(min, max);
      console.log(secretNumber);
      //intervalCount(askGuess, 0, 5);
      setInterval(askGuess);
      /*
      The struggle here is trying to clear the interval and keep the game from hanging
      The interval doesn't work whenever I assign it to a variable
      */
      //askGuess();
      
    })
  })
  
}
/**CREATE THE GAME Interface to illustrate this intervals
 * Enter a max number: *20*
Enter a min number: *11*
I'm thinking of a number between 11 and 20...
Enter a guess: *15*
Too high.
Enter a guess: *11*
Too low.
Enter a guess: *13*
Too high.
Enter a guess: *12*
Correct!
YOU WON.
 */

askRange();



/**
 * Make the limit dynamic by allowing the user to specify the number of attempts. We recommend creating an askLimit function that behaves similarly to askRange. Be sure to chain the callbacks in the right order to ensure the game is configured properly. For example, one valid callback chain order would be askLimit -> askRange -> askGuess. If you follow this order, you'll need to call askLimit in the global scope to begin the game.
 */
