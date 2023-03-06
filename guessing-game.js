const readline = require("readline");

// create an interface where we can talk to the user
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function checkGuess(num, ans) {
    if (num > ans) {
        console.log('Too high.');
        return false;
    }
    else if (num < ans) {
        console.log('Too low.');
        return false;
    }
    else {
        console.log('Correct!');
        return true;
    }
}

function askGuess(ans, attempts) {
    r1.question('Enter a guess. ', answer => {
        if (checkGuess(Number(answer), ans) === true) {
            console.log('You win!');
            r1.close();
        }
        else {
            let turns = attempts - 1;
            if (turns === 0) {
                console.log('Guesses all used up! You lose :(');
                r1.close();
            }
            else {
                return askGuess(ans, attempts - 1);
            }
        }
    });
}


function askLimit() {
    r1.question('Limited number of turns: ', answer => {
        const numAttempts = answer;
        return askRange(numAttempts);
    });
}

function askRange(numAttempts) {
    r1.question('Enter a max number. ', max => {
        r1.question('Enter a min number. ', min => {
            console.log(`I'm thinking of a number between ${min} and ${max}...`);
            const secretNumber = randomInRange(Number(min), Number(max));

            return askGuess(secretNumber, numAttempts);
            r1.close();
        });
    });
}

askLimit();
