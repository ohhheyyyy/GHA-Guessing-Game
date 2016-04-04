/****** Establish Global Variables ******/

var playersGuess;
var winningNumber = generateWinningNumber();
var maxGuesses = 5;
var previousGuesses = [];
var guessGuidance = "";

/****** Guessing Game Functions ******/

// Generate the Winning Number

function generateWinningNumber() {
    // return randomly generated number between 1 and 100
    return Math.floor((Math.random() * 100) + 1);
}

console.log(winningNumber);

/*******************************************************/

// Fetch the Players Guess

function playersGuessSubmission() {
    // retrieve and assign contestant's guess to playersGuess variable
    playersGuess = Number(+$('#visitor-guess').val());
    // erase data entered in input field
    $('#visitor-guess').val("");

    checkGuess();
}

/*******************************************************/

// Determine if the next guess should be a lower or higher number

function lowerOrHigher() {
    // check if contestant guess is larger than the winning number
    if (playersGuess > winningNumber) {
        guessGuidance = "The number is lower. Try again!";
        // check if contestant guess is lower than the winning number
    } else {
        guessGuidance = "The number is higher. Try again!";
    }
}

/*******************************************************/

// Check if the Player's Guess is the winning number 

function checkGuess() {
    // check if previousGuesses array contains the most recent guess
    if (previousGuesses.indexOf(playersGuess) !== -1) {
        guessGuidance = "Ya already tried that one, remember?";
    } else if (typeof(playersGuess) !== "number" || playersGuess < 1 || playersGuess > 100) {
        guessGuidance = "How about you try a number between 1 and 100?";
    } else {
        if (playersGuess === winningNumber) {
            $(".guessGuidance").hide();
            $(".guesses-remaining").html("<h3>WOW! You guessed the number!</h3>");
            $(".guesses-remaining").append("<h3>Boom shacka-lacka!</h3>");
            // $(".gameStatus").html("<h3>WOW! You guessed the number!</h3>");
            // $(".gameStatus").append("<h3>Boom shacka-lacka!</h3>");
        } else {
            // check if guess is too high or too low
            lowerOrHigher();
            // reduce the number of guesses by 1
            maxGuesses--;
            // push the most recent guess into the previousGuesses array
            previousGuesses.push(playersGuess);
            // update the text to inform the contestant of number of guesses left and their previous guesses
            $('.guesses-remaining').text("You've only got " + maxGuesses + " guesses remaining!");
            $('.guesses-remaining').append("<br> Your previous guesses: " + previousGuesses.join(' • '));
        }
        if (maxGuesses < 1) {
            $(".guesses-remaining").html("<h1>Uh oh.<br/> You Lose.</h1>");
        }
    }
    $('.guessGuidance').text(guessGuidance);
}

/*******************************************************/

// Create a provide hint button that provides additional clues to the "Player"

function provideHint() {

    // add winning number to possibleSolutions array
    possibleSolutions = [winningNumber];
    // add 6 additional randomly generated numbers to possibleSolutions array
    while (possibleSolutions.length < 7) {
        possibleSolutions.push(generateWinningNumber());
        // sort possibleSolutions numerically as opposed to alphabetically
        possibleSolutions.sort(function(a, b) {
            return a - b;
        });
    }
    // add the possibleSolutions array to the HTML
    $('.hints').html('<p id="guess-list">' + possibleSolutions.join(' • ') + '</p>');
}
// invoke provideHint
provideHint();

/*******************************************************/

// Allow the "Player" to Play Again

function playAgain() {
    winningNumber = generateWinningNumber();
    maxGuesses = 5;
    previousGuesses = [];
    $('.guessGuidance').text("Glad you're getting back on the saddle.");
    $('.guesses-remaining').text("You've got " + maxGuesses + " guesses left!");
    $('.guessGuidance').text(guessGuidance);
    $('hints').hide();
    $('#guess-list').remove();
    provideHint();
    $('.guessGuidance').text(guessGuidance);
    console.log(winningNumber);
}

/*******************************************************/

/****** Event Listeners / Handlers ******/

$(document).ready(function() {
    $('.amirite').on('click', function() {
        playersGuessSubmission();
    });
    $('#visitor-guess').on('keydown', function(enterKey) {
        // http://mikemurko.com/general/jquery-keycode-cheatsheet/
        if (enterKey.which == 13) {
            playersGuessSubmission();
        }
    });
    $('.helpme').on('click', function() {
        $('.hints').slideDown("slow");
    });
    $('.startova').on('click', function() {
        playAgain();
    });
});
