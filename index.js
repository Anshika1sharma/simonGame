// Colors array
var Button = ["green", "red", "yellow", "blue"];

// Game state variables
var gamePattern = [];
var choosedPattern = [];
var level = 0;
var started = false;

// Start game on keypress
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    store(); // Start first sequence
    started = true;
  }
});

// Function to generate a random number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

// Function to pick color and animate
function chosenColor() {
  var chosenNumber = nextSequence();
  var choosedColor = Button[chosenNumber];
  var $tile = $("#" + choosedColor);

  // Flash animation
  $tile.fadeTo(200, 0.3);
  setTimeout(function () {
    $tile.fadeTo(200, 1);
  }, 100);

  // Play sound
  var sound = new Audio("./sounds/" + choosedColor + ".mp3");
  sound.play();

  return choosedColor;
}

// Function to add color to the game pattern and go to next level
function store() {
  choosedPattern = []; // reset user input
  level++;
  $("#level-title").text("Level " + level);
  var add = chosenColor();
  gamePattern.push(add);
}

// Handle user clicks
$(".point").click(function () {
  var $tile = $(this);

  // Flash effect
  $tile.fadeTo(200, 0.3);
  setTimeout(function () {
    $tile.fadeTo(200, 1);
  }, 100);

  // User selected color
  var userChosenColor = $(this).attr("id");
  choosedPattern.push(userChosenColor);

  // Play sound
  var sound = new Audio("./sounds/" + userChosenColor + ".mp3");
  sound.play();

  // Check user answer
  checkAnswer(choosedPattern.length - 1);
});

// Function to check user's answer
function checkAnswer(currentIndex) {
  if (choosedPattern[currentIndex] === gamePattern[currentIndex]) {
    // If complete pattern is matched
    if (choosedPattern.length === gamePattern.length) {
      setTimeout(function () {
        store(); // Go to next level
      }, 1000);
    }
  } else {
    // Wrong answer
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();

    $(".full-page").addClass("game-over");
    setTimeout(function () {
      $(".full-page ").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  choosedPattern = [];
  started = false;
}
