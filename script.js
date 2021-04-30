const list = document.getElementById("list");
const button = document.getElementById("question-button");
const answersList = document.getElementById("answers-boxes");
const questionDisplay = document.querySelector("#question-box");
const answer = document.getElementsByClassName("single-answer");
const timer = document.querySelector("#timer");
const playBtn = document.getElementById("btn-play");
const game = document.getElementById("game");
const lives = document.getElementById("lives");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const counter = document.getElementById("counter");
const goodDisplay = document.querySelector(".good-answer");
const wrongDisplay = document.querySelector(".wrong-answer");

let playerLives = 3;
let questionCounter = 0;
counter.innerHTML = `${questionCounter}/50`;

lives.innerHTML = `You have ${playerLives} lives left !`;

let answersArray = [];
let questions = null;
let currentQuestion = 0;

playBtn.addEventListener("click", displayGame);

function displayGame() {
  console.log("Display clicked");
  game.style.removeProperty("display");
}

function displayQuestion() {
  questionDisplay.textContent = atob(questions[currentQuestion].question);
  shuffleAnswers();
  displayAnswers();
  eventAnswer();
  displayCatDif();
  console.log(questions[currentQuestion]);
  console.log(answersArray);
  console.log(answer);
  console.log(atob(questions[currentQuestion].correct_answer));
}

function displayCatDif() {
  category.textContent = atob(`${questions[currentQuestion].category}`);
  difficulty.textContent = atob(`${questions[currentQuestion].difficulty}`);
}

//here we display the answers in the list.
function displayAnswers() {
  answersList.innerHTML = "";
  setTimeout(() => {
    wrongDisplay.classList.add("wrong-hidden");
    goodDisplay.classList.add("good-hidden");
  }, 2000);

  answersArray.forEach((answer) => {
    answersList.innerHTML +=
      `<p class="single-answer">` + atob(answer) + `</p>`;
  });
}

// Here we shuffle the answers so they do not appear at the same place every question
function shuffleAnswers() {
  answersArray = [
    questions[currentQuestion].correct_answer,
    questions[currentQuestion].incorrect_answers[0],
    questions[currentQuestion].incorrect_answers[1],
    questions[currentQuestion].incorrect_answers[2],
  ];

  for (let i = answersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = answersArray[i];
    answersArray[i] = answersArray[j];
    answersArray[j] = temp;
  }

  return answersArray;
}

function eventAnswer() {
  for (let i = 0; i < answer.length; i++) {
    answer[i].addEventListener("click", answerCheck);
  }
}

// function startTimer() {
//   let timerID = setInterval(countdown, 1000);
//   let timeLeft = 60;

//   function countdown() {
//     if (timeLeft === -1) {
//       clearInterval(timerID);
//       // Print something to say "no more time"
//     } else {
//       timer.innerHTML = timeLeft + " seconds remaining";
//       timeLeft--;
//     }
//   }
// }

function switchQuestion() {
  currentQuestion++;
  displayQuestion();
}

function answerCheck(evt) {
  // here we compare the content of the event with the correct answer data
  if (
    evt.target.textContent === atob(questions[currentQuestion].correct_answer)
  ) {
    console.log("gg");
    questionCounter += 1;
    counter.innerHTML = `${questionCounter}/50`;
    goodDisplay.classList.remove("good-hidden");
    switchQuestion();
  } else {
    livesAlert();
    evt.target.style.backgoundColor = "red";
    playerLives--;
    lives.innerHTML = `You have ${playerLives} lives left !`;
    wrongDisplay.classList.remove("wrong-hidden");
    switchQuestion();
    console.log("dommage");
  }
}

function livesAlert() {
  if (playerLives === 0) {
    window.alert("You lost ! Click on 'ok' to retry");
    scroll(0, 0);
    setTimeout(() => {
      document.location.reload();
    }, 500);
  }
}

function handleHttpResponse(ajaxResponse) {
  const data = ajaxResponse.data;
  questions = [...Object.values(data.results)];

  displayQuestion();
  return questions;
}

axios
  .get("https://opentdb.com/api.php?amount=50&type=multiple&encode=base64")
  .then(handleHttpResponse);

//=========== PLAYER SYSTEM ============

// const playerButton = document.getElementById("button-player");
// const playerInput = document.querySelector("#input-player");
// const playerListDisplay = document.querySelector(".player-list");
// let turnNb = 0;

// console.log(playerListDisplay);

// const resetPlayers = () => (playerListDisplay.innerHTML = "");

// let playerList = [];

// class Player {
//   constructor(name) {
//     this.name = name;
//     this.lives = 3;
//     this.currentTurn = false;
//   }
// }

// function addPlayer() {
//   const boxValue = playerInput.value;
//   console.log("clicked");
//   playerList.push(new Player(playerInput.value));
//   console.log(playerList);
//   displayPlayers();
//   playerInput.value = "";
// }

// console.log(playerButton);
// playerButton.addEventListener("click", addPlayer);

// // addPlayer("Antoine", 3);
// console.log(Player);

// function deletePlayers(evt) {
//   const clickedBtn = evt.target;
//   const parentLi = clickedBtn.parentElement;
//   const EachPlayers = parentLi.querySelectorAll(".eachPlayers").textContent; //PROBLEME ICI (for EACH)
//   const indexPlayers = playerList.indexOf(EachPlayers);

//   console.log("delete clicked !");
//   playerList.splice(indexPlayers, 1);

//   parentLi.remove();
// }

// function displayPlayers() {
//   playerListDisplay.innerHTML += `<li> <span class = "eachPlayers">${playerInput.value}</span> <button class="btn-delete">delete</button></li>`;

//   const btnDelete = document.querySelector(".btn-delete");
//   btnDelete.addEventListener("click", deletePlayers);
// }

// // Player turn

// function playerTurn() {}

// function removeLives() {
//   name.life--;

//   // retirer coeurs
// }
