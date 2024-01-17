/* <p>Your final score is <span id="final-score"></span>.</p>
<p>
  Enter initials: <input type="text" id="initials" max="3" />
  <button id="submit">Submit</button>
</p>
</div>

<div id="feedback" class="feedback hide"></div> */


var startBtn = document.getElementById("start");
var time = document.getElementById("time");
var startScreen = document.getElementById ("start-screen");
var endScreen = document.getElementById ("end-screen");
var questionsScreen = document.getElementById("questions");
var questionTitleEl = document.getElementById("question-title");
var choicesButtonEl = document.getElementById("choices");
var feedbackAlert = document.getElementById("feedback");

var correctSound = new Audio("../sfx/correct.wav");
var incorrectSound = new Audio("../sfx/incorrect.wav");


var currentQuestionsIndex =0;
var questionNumber =0;


var timerInterval; 
var timeLeft;
var finalScore =document.getElementById("final-score");

startBtn.addEventListener("click", function () {
     // Hide the start screen
    startScreen.classList.add("hide");
    // Display questions scree
    questionsScreen.classList.remove("hide");
    createOptionButton();
      // Call the startQuiz function
    startQuiz();
    displayQuestions();
})

document.getElementById("start").addEventListener("click", function (event) {
    correctAudio.play();
  });
  function startQuiz() {
    timeLeft = 100;
    timerInterval = setInterval(() => {
    if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        time.textContent = timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
    } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        time.textContent = 'time up';
        endQuiz();
    }
  },1000);

}
function createOptionButton() {
    // Selecting the parent element where the buttons will be added
    let choicesDiv = document.getElementById("choices");
    // Creating four option buttons inside a loop
    for (let i = 0; i < 4; i++) {
        let button = document.createElement('button');
        // Adding a CSS class to the button for styling
        button.classList.add("choices-button");
        // Appending the button to the choicesDiv
        choicesDiv.appendChild(button);
    }
    // Selecting all the created buttons with the "choices-button" class
    choicesButtonEl = document.querySelectorAll('.choices-button');
    // Adding a click event listener to each button and linking it to the 'buttonsEventList' function
    for (let i = 0; i < choicesButtonEl.length; i++) {
        choicesButtonEl[i].addEventListener('click', buttonsEventList);
    }
    // Logging the selected buttons to the console for debugging
    console.log(choicesButtonEl, "button");
    // Removing the 'hide' class from the feedbackAlert element, making it visible
    feedbackEl.classList.remove('hide');
}



}

function displayQuestions() {
    // Retrieve the current question from the quizQuestions array based on the current index (i)
    currentQuestionsIndex = quizQuestions[questionNumber];
    // Update the text content of the question title element 
    // to display the current question number and title
    questionTitleEl.textContent = `Question ${questionNumber + 1}: ${currentQuestionsIndex["question-title"]}`;
    console.log(`Question ${questionNumber + 1}: ${currentQuestionsIndex["question-title"]}`);
    // Iterate through the choices for the current question
    for (let j = 0; j < currentQuestionsIndex.choices.length; j++) {
        // Set the text content of each choice button to display the corresponding choice 
        // for the current question
        choicesButtonEl[j].textContent = currentQuestionsIndex.choices[j];
    }
}
function buttonsEventList(event) {
    // Log the text content of the clicked button to the console
    console.log(event.target.textContent);
    // Get the text content of the clicked button (user's selected choice)
    let selectedChoice = event.target.textContent;
    // Get the current question object based on the current index (i)
    let currentQuestion = quizQuestions[questionNumber];
    // Check if the selected choice matches the correct answer for the current question
    if (selectedChoice === currentQuestion.answer) {
        // If correct, display a correct answer message in the feedback alert
        feedbackAlert.textContent = "correct!";
        correctAudio.play();
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
        // clearTimeout(choiceTimeout)
        
    } else {
        // If incorrect, subtract 5 seconds from the timer and display a wrong answer message
        timeLeft -= 5;
        feedbackEl.textContent = "wrong!";
        incorrectAudio.play();
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
        // clearTimeout(choiceTimeout)
    }  
}

function buttonsEventList(event) {
    // Log the text content of the clicked button to the console
    let selectedChoice = event.target.textContent;
    // Get the current question object based on the current index (i)
    let currentQuestion = quizQuestions[questionNumber];
    // Check if the selected choice matches the correct answer for the current question
    if (selectedChoice === currentQuestion.answer) {
      // If correct, display a correct answer message in the feedback alert
      feedbackAlert.textContent = "Your answer is correct!";
      correctAudio.play();
      setTimeout(function () {
        feedbackAlert.textContent = "";
        moveToNextQuestion();
      }, 1000);
      // clearTimeout(choiceTimeout)
    } else {
      // If incorrect, subtract 5 seconds from the timer and display a wrong answer message
      timeLeft -= 5;
      feedbackAlert.textContent = "Your answer is wrong!";
      incorrectAudio.play();
      setTimeout(function () {
        feedbackAlert.textContent = "";
        moveToNextQuestion();
      }, 1000);
      // clearTimeout(choiceTimeout)
    }
  }
// Move to the next question or end the quiz if all questions are answered
function moveToNextQuestion() {
    // Check if there are more questions
    if (questionNumber < quizQuestions.length - 1) {
        // If there are, increment the index (i) and display the next question
        questionNumber++;
        displayQuestions();
    } else {
        // If there are no more questions, end the quiz
        console.log('Quiz completed!');
        // Call the function to end the quiz
        endQuiz();
    }
}

function endQuiz(){
    displayScore();
    clearInterval (timerInterval);
    questionsScreen.setAttribute ("class","hide");
    endScreenEl.removeAttribute ("class");
    feedbackEl.setAttribute ("class", "hide");
}

function displayScore() {
    if (endQuiz) {
        // Add textContent to span final-score from the timeLeft
        finalScore.textContent = timeLeft;
    }
}

// Create eventListener for submit button on the end-screen 
// Select button element from end-screen and store it in a variable 
let submitBtn = document.querySelector("#submit");
// Initialize an empty array to store highscores
let  highscoresArray = [];
// Add eventListener to submitBtn 
submitBtn.addEventListener('click', function(event) {
    // use preventDefault to prevent dafault submit and just save to localStorage
    event.preventDefault();
      // Get the value of the initials input field
      let initials = document.querySelector("#initials").value;
        // Update the content of the finalScore element 
        finalScore.textContent = timeLeft;
        // Create a highscores object with initials and score
        highscores = { initials: initials, score: timeLeft };
        // Retrieve highscores from localStorage and parse it
        let highScoresLocStor = JSON.parse(localStorage.getItem('highscores'));
        // Check if there are existing highscores in localStorage
        if (highScoresLocStor === null) {
            // If no existing highscores, push the current highscores to the array 
            // and save to localStorage
            highscoresArray.push(highscores);
            localStorage.setItem('highscores', JSON.stringify(highscoresArray));
        } else {
            // If there are existing highscores, push the current highscores 
            //to the array and save to localStorage
            highScoresLocStor.push(highscores);
            localStorage.setItem('highscores', JSON.stringify(highScoresLocStor));
        }
    // Redirect the user to the 'highscores.html' page
    location.href = 'highscores.html'
});

