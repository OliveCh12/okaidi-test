// Declare un empy variable
let questionsData;

// Generate random questions fetchin the opentdb api
window.addEventListener("DOMContentLoaded", (event) => {
  fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((response) => (questionsData = response))
    .catch((error) => alert("Erreur : " + error));
});

// Listening start Button
const validateButton = document.querySelector("#start");

const questionTitle = document.querySelector(".question__title");
const questionCategory = document.querySelector(".question__category");
const questionDifficulty = document.querySelector(".question__difficulty");
const questionIndex = document.querySelector(".question__index");

// DOM question body elements
const questionBody = {
  title: document.querySelector(".question__title"),
  category: document.querySelector(".question__category"),
  difficulty: document.querySelector(".question__difficulty"),
  index: document.querySelector(".question__index"),
  answersList: document.querySelector(".question__answers"),
};

const answersCheckbox = document.querySelectorAll(".question__checkbox");
const answersLabel = document.querySelectorAll(".question__label");

let index = 0;

// Start triggering questions
validateButton.addEventListener("click", () => {
  handleNextQuestion();
});

const handleNextQuestion = () => {
  const question = questionsData.results[index++];

  if (index === 10) {
    alert("You finished the game");
    index = 0;
  }

  console.log(question);

  // Display Data in DOM
  questionTitle.innerHTML = question.question;
  questionCategory.innerHTML = question.category;
  questionIndex.innerHTML = `${index} / ${questionsData.results.length}`;

  // Listing incorrect Answers
  question.incorrect_answers.forEach((item, index) => {
    answersLabel[index].innerText = item;
    answersCheckbox[index].value = item;
  });

  // Listing Correct Answer
  answersLabel[answersLabel.length - 1].innerText = question.correct_answer + "✅";
  answersCheckbox[answersCheckbox.length - 1].value = question.correct_answer;

  // Define the color of the difficulty
  switch (question.difficulty) {
    case "easy":
      questionDifficulty.className = "question__difficulty question__difficulty--easy";
      questionDifficulty.innerHTML = question.difficulty;
      break;
    case "medium":
      questionDifficulty.className = "question__difficulty question__difficulty--medium";
      questionDifficulty.innerHTML = question.difficulty;
      break;
    case "hard":
      questionDifficulty.className = "question__difficulty question__difficulty--hard";
      questionDifficulty.innerHTML = question.difficulty;
      break;
    default:
      questionDifficulty.innerHTML = "Difficulty";
      break;
  }
};

// Toggle Active Class for a selected Question

// const selectAnswer = () => {
const questionAnswers = document.querySelectorAll(".question__answer");
const clickAudio = new Audio("../assets/sounds/click_002.ogg");

questionAnswers.forEach((item, index) => {
  item.addEventListener("click", () => {
    clickAudio.play();

    // if (item.classList.contains("question__answer--active")) {
    //   item.classList.remove("question__answer--active");
    // }
    // item.classList.add("question__answer--active");
    console.log(index);

    if (item.childNodes[1].checked) {
      item.childNodes[1].checked = false;
      item.classList.remove("question__answer--active");
    } else {
      item.childNodes[1].checked = true;
      item.classList.add("question__answer--active");
    }
  });
});

// Timer Logic
const questionTimer = document.querySelector(".question__timer");

let seconds = 30;
const timer = setInterval(() => {
  questionTimer.innerHTML = `${seconds--} s`;
  if (seconds === 0) {
    clearInterval(timer);
    questionTimer.innerHTML = "Times up";
  }
}, 1000);
