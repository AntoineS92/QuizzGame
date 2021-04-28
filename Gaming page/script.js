const list = document.getElementById("list");
const button = document.getElementById("question-button");
const answersList = document.getElementById("answers-boxes");
const questionDisplay = document.querySelector("#question-box");
const answer = document.getElementsByClassName("single-answer");
const timer = document.querySelector("#timer");

let answersArray = [];
let questions = null;
let currentQuestion = 0;

function displayQuestion() {
  questionDisplay.textContent = questions[currentQuestion].question;
  console.log(questions[currentQuestion]);
  shuffleAnswers();
  console.log(answersArray);

  displayAnswers();

  console.log(answer);
  eventAnswer();
  console.log(questions[currentQuestion].correct_answer);
}

//here we display the answers in the list.
function displayAnswers() {
  answersList.innerHTML = "";
  answersArray.forEach((answer) => {
    answersList.innerHTML += `<p class="single-answer">${answer}</p>`;
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

function startTimer() {
  let timeLeft = 60;
  let timerID = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft === -1) {
      clearInterval(timerID);
      // Print something to say "no more time"
    } else {
      timer.innerHTML = timeLeft + " seconds remaining";
      timeLeft--;
    }
  }
}

function switchQuestion() {
  currentQuestion++;
  displayQuestion();
  button.classList.add("is-hidden-button");
  startTimer();
}

function answerCheck(evt) {
  // here we compare the content of the event with the correct answer data
  console.log(questions[currentQuestion].correct_answer);
  if (evt.target.textContent === questions[currentQuestion].correct_answer) {
    console.log("gg");
    button.classList.remove("is-hidden-button"); //the "next question" button appears here
  } else {
    console.log("dommage");
  }
}

function handleHttpResponse(ajaxResponse) {
  const data = ajaxResponse.data;
  questions = [...Object.values(data.results)];

  displayQuestion();
  return questions;
}

button.addEventListener("click", switchQuestion);

axios
  .get("https://opentdb.com/api.php?amount=50&type=multiple")
  .then(handleHttpResponse);

//=========== PLAYER SYSTEM ============

const playerButton = document.getElementById("button-player");
const playerInput = document.querySelector("#input-player");
const playerListDisplay = document.querySelector(".player-list");

const resetPlayers = () => (playerListDisplay.innerHTML = "");

let playerList = [];

class Player {
  constructor(name) {
    this.name = name;
    this.lives = 3;
    this.currentTurn = false;
  }
}

function addPlayer() {
  const boxValue = playerInput.value;
  console.log("clicked");
  playerList.push(new Player(playerInput.value));
  console.log(playerList);
  displayPlayers();
  playerInput.value = "";
}

console.log(playerButton);
playerButton.addEventListener("click", addPlayer);

// addPlayer("Antoine", 3);
console.log(Player);

function deletePlayers(evt) {
  const clickedBtn = evt.target;
  const parentLi = clickedBtn.parentElement;
  console.log(parentLi.textContent)
  const EachPlayers = parentLi.querySelector(".eachPlayers").textContent;
  const indexPlayers = playerList.indexOf(EachPlayers);

  console.log("delete clicked !");
  playerList.splice(indexPlayers, 1);

  parentLi.remove();
}

function displayPlayers() {
  
  playerListDisplay.innerHTML += `<li> <span class = "eachPlayers">${playerInput.value}</span> <button class="btn-delete">delete</button></li>`

  const btnDelete = document.querySelector(".btn-delete");
  btnDelete.addEventListener("click", deletePlayers);
}
