const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct_answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct_answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct_answer: "Pacific",
  },
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    correct_answer: "Delhi",
  },
  {
    question: "In which Indian state is Barkatullah University located?",
    options: [
      "Maharashtra",
      "Madhya Pradesh",
      "Uttar Pradesh",
      "Gujarat",
    ],
    correct_answer: "Madhya Pradesh",
  },
  {
    question: "Which city is home to Barkatullah University?",
    options: ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
    correct_answer: "Bhopal",
  },
  {
    question:
      "What is the name of the Governor who is the Chancellor of Barkatullah University?",
    options: [
      "Governor of Madhya Pradesh",
      "President of India",
      "Chief Minister of MP",
      "Vice President of India",
    ],
    correct_answer: "Governor of Madhya Pradesh",
  },
  {
    question:
      "Which of the following is a degree offered by Barkatullah University?",
    options: ["MCA", "MBBS", "LLB", "All of the above"],
    correct_answer: "All of the above",
  },
  {
    question: "In which year was Barkatullah University established?",
    options: ["1950", "1970", "1980", "1960"],
    correct_answer: "1970",
  },
  {
    question: "Barkatullah University was formerly known as?",
    options: [
      "Bhopal University",
      "Madhya University",
      "Central India University",
      "Rajiv Gandhi University",
    ],
    correct_answer: "Bhopal University",
  },
];

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let timerInterval;
let timeoutId;
let timeLeft = 15;

const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const questionElement = document.querySelector(".question");
const optionButtons = document.querySelectorAll(".option");
const nextButton = document.querySelector(".next-button");
const stopButton = document.querySelector(".stop-button");
const resultElement = document.querySelector(".result");
const timerElement = document.querySelector(".timer");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  optionButtons.forEach((button, index) => {
    button.innerText = currentQuestion.options[index];
    button.style.backgroundColor = "";
    button.disabled = false;
  });
  selectedAnswer = null;
  resultElement.innerText = "";
  timeLeft = 15;
  timerElement.innerText = `Time left: ${timeLeft}s`;
  startTimer();
}

optionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    selectedAnswer = index;
    optionButtons.forEach((btn) => (btn.style.backgroundColor = ""));
    button.style.backgroundColor = "yellow";
  });
});

function checkAnswer() {
  clearInterval(timerInterval);
  if (selectedAnswer === null) {
    resultElement.innerText = "Please select an answer!";
    return false;
  }

  const correctAnswer = quizData[currentQuestionIndex].correct_answer;
  const userAnswer = optionButtons[selectedAnswer].innerText;

  if (userAnswer === correctAnswer) {
    resultElement.innerText = "Correct!";
    resultElement.style.color = "green";
    score++;
  } else {
    resultElement.innerText = `Incorrect! The correct answer was ${correctAnswer}.`;
    resultElement.style.color = "red";
  }

  optionButtons.forEach((btn) => (btn.disabled = true));
  return true;
}

nextButton.addEventListener("click", () => {
  const answered = checkAnswer();
  if (!answered) return;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }, 1500);
});

stopButton.addEventListener("click", () => {
  clearInterval(timerInterval); 
  clearTimeout(timeoutId); 
  showFinalScore();
});

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      resultElement.innerText = "Time's up!";
      optionButtons.forEach((btn) => (btn.disabled = true));

      // Store timeout ID to allow canceling it ---------------
      timeoutId = setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
          loadQuestion();
        } else {
          showFinalScore();
        }
      }, 1000);
    }
  }, 1000);
}

function showFinalScore() {
  questionElement.innerText = "Quiz Completed!";
  document.querySelector(".options").style.display = "none";
  nextButton.style.display = "none";
  stopButton.style.display = "none";
  resultElement.innerText = `Your Score: ${score} / ${quizData.length}`;
  resultElement.style.color = "#333";
}

// Event listener to start the quiz ------------------------
document.querySelector(".start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  startScreen.classList.remove("start-screen");
  quizScreen.classList.remove("hidden");
  loadQuestion();
  nextButton.classList.remove("hidden");
  stopButton.classList.remove("hidden");
});
