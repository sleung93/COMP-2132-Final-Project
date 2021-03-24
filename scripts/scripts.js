/**
Game Class
**/
class Game {
     // Constructor to create the Player object
     constructor(playerDice1, playerDice2, opponentDice1, opponentDice2, playerPoints, opponentPoints) {
          this.playerDice1 = "faceless";
          this.playerDice2 = "faceless";
          this.opponentDice1 = "faceless";
          this.opponentDice2 = "faceless";
          this.playerPoints = 0;
          this.opponentPoints = 0;
     }

     /**
     Function returns a number from 0 to 5 inclusive, rounds it down, and then adds 1 - making it return a number from 1-6 inclusive.
     **/
     rollDice() {
          return Math.floor(Math.random() * 6) + 1;
     }

     /**
      * Function calculates the total points for each round
      * @param {*} roll1
      * @param {*} roll2
      * @returns points
      */
     calculatePoints(roll1, roll2) {
          let points;

          // if either dice rolls a 1, score 0 for the round
          // if both dice are the same, score the sum the two and double it
          // otherwise, score the sum the two dice only
          if (roll1 === 1 || roll2 === 1) {
               points = 0;
          } else if (roll1 === roll2) {
               points = (roll1 + roll2) * 2;
          } else {
               points = roll1 + roll2;
          }

          return points;
     }

     /**
      * Updates graphical images of dice
      */
     setImages() {
          // first, create variables to store path
          const pImage1 = `images/dice-${this.playerDice1}.png`;
          const pImage2 = `images/dice-${this.playerDice2}.png`;
          const oImage1 = `images/dice-${this.opponentDice1}.png`;
          const oImage2 = `images/dice-${this.opponentDice2}.png`;

          // second, use jQuery to select imgs
          // then set them src for the imgs to the saved url from above
          const $pDice1 = $("#player-dice-1"); // player's
          const $pDice2 = $("#player-dice-2");
          $pDice1.attr("src", pImage1);
          $pDice2.attr("src", pImage2);

          const $oDice1 = $("#opponent-dice-1"); // opponent's
          const $oDice2 = $("#opponent-dice-2");
          $oDice1.attr("src", oImage1);
          $oDice2.attr("src", oImage2);
     }

     updatePoints(playerRound, playerTotal, opponentRound, opponentTotal) {
          // selects h3s to display points and stores it in a variable
          // then select that variable's text to parameters
          const $pRound = $("#player-round-score");
          const $pTotal = $("#player-total-score");
          $pRound.text(`Points scored this round: ${playerRound}`);
          $pTotal.text(`Total Points: ${playerTotal}`);

          const $oRound = $("#opponent-round-score");
          const $oTotal = $("#opponent-total-score");
          $oRound.text(`Points scored this round: ${opponentRound}`);
          $oTotal.text(`Total Points: ${opponentTotal}`);
     }

     /**
      * Rolls a pair of dice for both player and opponent
      * Calls functions rollDice() and setImages()
      */
     playGame() {
          // keeps track of rolls
          this.playerDice1 = this.rollDice();
          this.playerDice2 = this.rollDice();
          this.opponentDice1 = this.rollDice();
          this.opponentDice2 = this.rollDice();

          // keeps track of POINTS EARNED EACH ROUND
          const playerResults = this.calculatePoints(this.playerDice1, this.playerDice2);
          const opponentResults = this.calculatePoints(this.opponentDice1, this.opponentDice2);

          // keeps track of TOTAL POINTS
          this.playerPoints += playerResults;
          this.opponentPoints += opponentResults;

          // displays the dice rolled graphically
          this.setImages();

          // updates text to display current round's earned points and total points
          this.updatePoints(playerResults, this.playerPoints, opponentResults, this.opponentPoints);

          // for testing
          console.log(`Player first dice rolled a ${this.playerDice1}`);
          console.log(`Player second dice rolled a ${this.playerDice2}`);
          console.log(`Player points: ${this.playerPoints}`);
          console.log("");
          console.log(`Opponent first dice rolled a ${this.opponentDice1}`);
          console.log(`Opponent second dice rolled a ${this.opponentDice2}`);
          console.log(`Opponent points: ${this.opponentPoints}`);
     }

     /**
      * Function declares a winner based on whoever has the most points
      * @returns a String to be used in the $results text
      */
     declareWinner() {
          if (this.playerPoints > this.opponentPoints) {
               return `You won! You have ${this.playerPoints} points and your opponent has ${this.opponentPoints} points.`;
          } else if (this.opponentPoints > this.playerPoints) {
               return `You lost! You have ${this.playerPoints} points and your opponent has ${this.opponentPoints} points.`;
          } else {
               return `It was a draw! You have ${this.playerPoints} points and your opponent has ${this.opponentPoints} points.`;
          }
     }

     /**
      * Resets game back to beginning state
      * Resets graphical images
      * Resets score tally
      */
     resetGame() {
          this.playerDice1 = "faceless";
          this.playerDice2 = "faceless";
          this.opponentDice1 = "faceless";
          this.opponentDice2 = "faceless";
          this.playerPoints = 0;
          this.opponentPoints = 0;

          this.setImages();
          this.updatePoints(0, this.playerPoints, 0, this.opponentPoints);

          // for testing
          console.log("");
          console.log("Reset game!");
     }
}

/**
 * Buttons
 * Includes: Roll Dice and New Game buttons
 */

// create a new Game object named "gameObject" - note: must be created OUTSIDE click function so object is stored in memory
const gameObject = new Game();
// keeps track of current rounds
let roundCounter = 0;
// select h2 that will display who won after 3 rounds
const $results = $("#results");

// select Roll Dice button with jQuery
const $rollButton = $("#roll-dice");
// add click event to it
$rollButton.click(function () {
     if (roundCounter < 3) {
          roundCounter++;
          gameObject.playGame();
     }

     if (roundCounter === 3) {
          $results.text(gameObject.declareWinner());
     }
});

// select New Game button with jQuery
const $newGameButton = $("#new-game");
// add click event to it
$newGameButton.click(function () {
     gameObject.resetGame();
     roundCounter = 0;
     $results.text("");
});

/**
 * Fade in effect for hero text (Fancy a game of dice?)
 */
// select the hero text
$heroText = $("#hero-text");

// set opacity to 0
$heroText.css("opacity", 0);
// slowly change hero text opacity to 1
$heroText.fadeTo(4100, 1);
