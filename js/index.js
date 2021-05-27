// Data fetched from opendb is stored inside an empty variable
let questionsData;

// State of current question
let currentIndex = 0;
let seconds = 30;

// Generate random questions fetchin the opentdb api
fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then((response) => response.json())
  .then((response) => (questionsData = response))
  .catch((error) => alert("Erreur : " + error));

// Declare all variables representing the html tags present in the DOM
const validateButton = document.querySelector("#validate");

const questionBody = document.querySelector(".question__answers");
const questionTitle = document.querySelector(".question__title");
const questionCategory = document.querySelector(".question__category");
const questionDifficulty = document.querySelector(".question__difficulty");
const questionIndex = document.querySelector(".question__index");
const questionResponse = document.querySelector(".question__response");
const answersCheckbox = document.querySelectorAll(".question__checkbox");
const answersLabel = document.querySelectorAll(".question__label");

// Render Question inside the DOM
const renderQuestionData = (question) => {
  questionBody.style = "display: block";

  // Display Data in DOM (Question Header)
  questionTitle.innerText = question.question;
  questionCategory.innerText = question.category;
  questionIndex.innerText = `${currentIndex + 1} / ${questionsData.results.length}`;

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

  // Randomize Answer in array (Question Body)
  let allAnswers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  // Display Data in each answer tag
  allAnswers.forEach((answer, index) => {
    answersLabel[index].innerText = answer;
    answersCheckbox[index].value = answer;
  });
};

// Validate Answer for a given question
const validateAnswer = (question) => {
  const seletedInput = document.querySelector('input[type="radio"]:checked');
  const allInputs = document.querySelectorAll('input[type="radio"]');

  // Check if selected input match to question.correct_answer
  if (seletedInput === null) {
    questionResponse.innerText = "No selected answer";
  } else if (seletedInput.value === question.correct_answer) {
    questionResponse.innerText = "Last answer is correct ✅";
    seconds = 30;
    currentIndex++;
  } else {
    console.table("Yours :", seletedInput.value, "Correct:", question.correct_answer);
    questionResponse.innerText = "Last answer is incorrect ❌";
    seconds = 30;
    currentIndex++;
  }

  // Set all inputs to false and remove active class
  allInputs.forEach((input) => {
    input.checked = false;
    input.parentNode.classList.remove("question__answer--active");
  });
};

// Toggle active class for a selected Question with Event Listener
const questionAnswers = document.querySelectorAll(".question__answer");
const clickAudio = new Audio("../assets/sounds/click.ogg");

questionAnswers.forEach((item) => {
  item.addEventListener("click", () => {
    clickAudio.play();
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

const timer = setInterval(() => {
  questionTimer.innerHTML = `${seconds--} s`;
  if (seconds === 0) {
    seconds = 30;
    validateButton.click();
  }
}, 1000);

validateButton.addEventListener("click", () => {
  if (currentIndex >= questionsData.results.length) {
    alert("The Quizz is finish, please reload");
  } else {
    validateButton.innerText = "Validate";
    validateAnswer(questionsData.results[currentIndex]);
    renderQuestionData(questionsData.results[currentIndex]);

    // Console.Log Correct Answer
    console.log({
      id: currentIndex,
      correct: questionsData.results[currentIndex].correct_answer,
    });
  }
});
