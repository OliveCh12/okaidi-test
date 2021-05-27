// Data fetched from opendb is stored inside an empty variable
let questionsData;

let currentIndex = 0;
let seconds = 30;

// Generate random questions fetchin the opentdb api
window.addEventListener("load", () => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then((response) => response.json())
    .then((response) => (questionsData = response))
    .catch((error) => alert("Erreur : " + error));
});

// Declare all variables representing the html tags present in the DOM
const nextButton = document.querySelector("#next");

const questionTitle = document.querySelector(".question__title");
const questionCategory = document.querySelector(".question__category");
const questionDifficulty = document.querySelector(".question__difficulty");
const questionIndex = document.querySelector(".question__index");
const questionResponse = document.querySelector(".question__response");
const answersCheckbox = document.querySelectorAll(".question__checkbox");
const answersLabel = document.querySelectorAll(".question__label");

// Handling Next Question
const handleNextQuestion = (currentQuestionIndex) => {
  let question = questionsData.results[currentQuestionIndex];

  console.log(currentQuestionIndex);

  // Display Data in DOM (Question Header)
  questionTitle.innerText = question.question;
  questionCategory.innerText = question.category;
  questionIndex.innerText = `${currentIndex} / ${questionsData.results.length}`;

  // Display and define the color of the difficulty (Question Header)
  switch (question.difficulty) {
    case "easy":
      questionDifficulty.className = "question__difficulty question__difficulty--easy";
      questionDifficulty.innerText = question.difficulty;
      break;
    case "medium":
      questionDifficulty.className = "question__difficulty question__difficulty--medium";
      questionDifficulty.innerText = question.difficulty;
      break;
    case "hard":
      questionDifficulty.className = "question__difficulty question__difficulty--hard";
      questionDifficulty.innerText = question.difficulty;
      break;
    default:
      questionDifficulty.innerText = "Difficulty";
      break;
  }
  console.log("Correct :", question.correct_answer);

  // Validate Answer for a given question
  const seletedInput = document.querySelector('input[type="radio"]:checked');
  const allInputs = document.querySelectorAll('input[type="radio"]');

  if (seletedInput === null) {
    console.log("No Input");
  } else if (seletedInput.value === question.correct_answer) {
    questionResponse.innerText = "Last answer is correct ✅";
  } else {
    console.log("Yours :", seletedInput.value);
    questionResponse.innerText = "Last answer is incorrect ❌";
  }

  // Set all inputs to false and remove active class
  // allInputs.forEach((input) => {
  //   input.checked = false;
  //   input.parentNode.classList.remove("question__answer--active");
  // });

  // Randomize Answer (Question Body)
  let allAnswers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  allAnswers.forEach((answer, index) => {
    answersLabel[index].innerText = answer;
    answersCheckbox[index].value = answer;
  });

  console.warn(currentIndex, questionsData.results);
};

// Toggle Active Class for a selected Question
const questionAnswers = document.querySelectorAll(".question__answer");
const clickAudio = new Audio("../assets/sounds/click.ogg");

questionAnswers.forEach((item) => {
  item.addEventListener("click", () => {
    clickAudio.play();
    if (item.childNodes[1].checked) {
      item.childNodes[1].checked = false;
      // console.log(document.querySelector('input[type="radio"]:checked').value);
      // item.classList.remove("question__answer--active");
    } else {
      item.childNodes[1].checked = true;
      // console.log(document.querySelector('input[type="radio"]:checked').value);

      // item.classList.add("question__answer--active");
    }
  });
});

// Timer Logic
//const questionTimer = document.querySelector(".question__timer");

// const timer = setInterval(() => {
//   questionTimer.innerHTML = `${seconds--} s`;
//   if (seconds === 0) {
//     seconds = 30;
//     handleNextQuestion();
//   }
// }, 1000);

// Validate Answer for question

// const startButton = document.querySelector("#start");
// const nextButton = document.querySelector("#next");

nextButton.addEventListener("click", () => {
  if (currentIndex === 0) {
    nextButton.innerText = "Next";
    handleNextQuestion(0);
    currentIndex++;
  } else if (currentIndex === 5) {
    alert("Finish");
  } else {
    handleNextQuestion(currentIndex++);
  }
});
