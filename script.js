// Starting variables

let game = false;
let startButton = document.getElementById("start");
let retryButton = document.getElementById("retry");
let positionsArray = [];
let counter = 0;
let winMessage = document.getElementById("you-win");
let loseMessage = document.getElementById("you-lose");
let paintedNumbers = [];

// Stablish random positions throughout the screen for the numbers
// The while-loop asures that no random position gets repeated 
//   in other words: no number gets overwritten
// Writes the numbers in the randomized positions
const randomPosition = () => {
  let position;
  for(let num = 1; num < 10; num++) {
    position = Math.floor(Math.random()*40);
    while (positionsArray.includes(position)) {
      position = Math.floor(Math.random()*40);
    }
    positionsArray.push(position);
    document.getElementById(position).innerHTML = num;
  }
}

// Painting the numbers with a white screen so they can't be seen
const paintPositions = (numberCoordinate) => {
  for (let index = 0; index < numberCoordinate.length; index++) {
    let currentPosition = document.getElementById(numberCoordinate[index]);
    currentPosition.classList.add("painted-cell");
    paintedNumbers.push(currentPosition);
  }
}

// Pretty self-explanatory
const resetValues = () => {
  
  for (let index = 0; index < paintedNumbers.length; index++) {
     if (paintedNumbers[index].classList.contains("painted-cell")) {
        paintedNumbers[index].classList.remove("painted-cell")

     }
    paintedNumbers[index].innerHTML = ""
    paintedNumbers[index].style.visibility = "visible"
  }
  game = true;
  paintedNumbers.splice(0, paintedNumbers.length)
  console.log(positionsArray);
  counter = 0;
  console.log(counter)
  positionsArray.splice(0, positionsArray.length)
  console.log(paintedNumbers)
  startButton.style.display = "none";
  retryButton.style.display = "none";
  winMessage.style.display = "none";
  loseMessage.style.display = "none";
}

// Game logic
const startGame = () => {
  resetValues();
  randomPosition();
  setTimeout(() => {
  paintPositions(positionsArray);
  clickedNumber();
  }, 500);
}

//Lost game state
const lostGame = () => {
  for (let index = 0; index < paintedNumbers.length; index++) {
    paintedNumbers[index].style.visibility="hidden"
    paintedNumbers[index].innerHTML=""
  }
  loseMessage.style.display="block";
  retryButton.style.display="block"
}

//Won game state
const wonGame = () => {
  for (let index = 0; index < paintedNumbers.length; index++) {
    paintedNumbers[index].style.visibility="hidden"
  }
  winMessage.style.display="block";
  retryButton.style.display="block"
}

//Check if a Clicked Number is correct
const checkClickedNumber = (clickedElement) => {
  let number = clickedElement.innerHTML;
  if (number == counter + 1) {
    counter++
    clickedElement.style.visibility = "hidden";
    console.log(positionsArray[number - 1].innerHTML)
  } else {
    lostGame()
  }
  if (counter === 9) {
    wonGame();
  }
}

//Number Click Logic
const clickedNumber = () => {
  for (let index = 0; index < paintedNumbers.length; index++) {
    paintedNumbers[index].addEventListener("click", function() {
      checkClickedNumber(paintedNumbers[index])
    })
  }
}
