/*
Dice Class
*/
class Dice {
     // Constructor to create the Player object
     constructor(diceFace1, diceFace2, points) {
          this.diceFace1 = "faceless";
          this.diceFace2 = "faceless";
          this.points = 0;
     }

     /**
     Function returns a number from 0 to 5 inclusive, rounds it down, and then adds 1 - making it return a number from 1-6 inclusive.
     **/
     rollDice() {
          return Math.floor(Math.random() * 6) + 1;
     }

     playGame() {
          const roll1 = this.rollDice();
          const roll2 = this.rollDice();
          let points;

          console.log(`First dice rolled a ${roll1}`);
          console.log(`Second dice rolled a ${roll2}`);

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

          console.log(`Points: ${points}`);

          /* SET SOME PICTURES HERE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          this.diceFace1 = roll1;
          this.diceFace2 = roll2;

          src(../{diceFace1}) etc
           */
          this.diceFace1 = roll1;
          this.diceFace2 = roll2;

          this.points += points;
          return points;
     }

     /**
      * Resets game back to beginning state
      */
     resetGame() {
          this.diceFace1 = "faceless";
          this.diceFace2 = "faceless";
          this.points = 0;
     }
}

// testing
const dice = new Dice();

dice.playGame();
console.log(`Face1: ${dice.diceFace1}`);
console.log(`Face2: ${dice.diceFace2}`);
console.log(`Points: ${dice.points}`);

dice.playGame();
console.log(`Face1: ${dice.diceFace1}`);
console.log(`Face2: ${dice.diceFace2}`);
console.log(`Points: ${dice.points}`);

dice.resetGame();
console.log(`Face1: ${dice.diceFace1}`);
console.log(`Face2: ${dice.diceFace2}`);
console.log(`Points: ${dice.points}`);
