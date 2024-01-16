/* <p>Your final score is <span id="final-score"></span>.</p>
<p>
  Enter initials: <input type="text" id="initials" max="3" />
  <button id="submit">Submit</button>
</p>
</div>

<div id="feedback" class="feedback hide"></div> */


var startBtn = document.getElementById("start");
var timeEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var correctSound = new Audio("../sfx/correct.wav");
var incorrectSound = new Audio("../sfx/incorrect.wav");
var endScreenEl = document.getElementById ("end-screen");
var startScreenEl = document.getElementById ("start-screen");
var questionNumber =0;



startBtn.addEventListener('click',function(event){
     // Hide the start screen
    startScreenEl.classList.add("hide");
    // Display questions screen
    questionsEl.classList.remove("hide");
    createOptionButton();
      // Call the startQuiz function
    startQuiz();
    displayQuestions();
});


var timerInterval; 
var timeLeft;
// each question x25 sec; or simply input the number of seconds
var time = questions.length *25;

function startQuiz() {
  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      endQuiz()
    }
  },1000);

}

// Function to create option buttons
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
    choiceButtonEl = document.querySelectorAll('.choices-button');
    // Adding a click event listener to each button and linking it to the 'buttonsEventList' function
    for (let i = 0; i < choiceButtonEl.length; i++) {
        choiceButtonEl[i].addEventListener('click', buttonsEventList);
    }
    // Logging the selected buttons to the console for debugging
    console.log(choiceButtonEl, "button");
    // Removing the 'hide' class from the feedbackAlert element, making it visible
    feedbackAlert.classList.remove('hide');
}

// Function to display the current question and choices on the screen
function displayQuestions() {
    // Retrieve the current question from the quizQuestions array based on the current index (i)
    currentQuestionIndex = quizQuestions[questionNumber];
    // Update the text content of the question title element 
    // to display the current question number and title
    questionTitleEl.textContent = `Question ${questionNumber + 1}: ${currentQuestionIndex["question-title"]}`;
    console.log(`Question ${questionNumber + 1}: ${currentQuestionIndex["question-title"]}`);
    // Iterate through the choices for the current question
    for (let j = 0; j < currentQuestionIndex.choices.length; j++) {
        // Set the text content of each choice button to display the corresponding choice 
        // for the current question
        choiceButtonEl[j].textContent = currentQuestionIndex.choices[j];
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
        feedbackAlert.textContent = "Your answer is correct!";
        correctAudio.play();
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
        // clearTimeout(choiceTimeout)
        
    } else {
        // If incorrect, subtract 5 seconds from the timer and display a wrong answer message
        timeLeft -= 5;
        feedbackAlert.textContent = "Your answer is wrong!";
        incorrectAudio.play();
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
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
  clearInterval (timerInterval);
  questionsEl.setAttribute ("class","hide");
  endScreenEl.removeAttribute ("class");
}
startBtn.onclick = startQuiz;

