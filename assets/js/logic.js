/* <p>Your final score is <span id="final-score"></span>.</p>
<p>
  Enter initials: <input type="text" id="initials" max="3" />
  <button id="submit">Submit</button>
</p>
</div>

<div id="feedback" class="feedback hide"></div> */


    // var startBtn = document.getElementById("start");
    // var time = document.getElementById("time");
    // var startScreen = document.getElementById ("start-screen");
    // var endScreen = document.getElementById ("end-screen");
    // var questionsScreen = document.getElementById("questions");
    // var questionTitleEl = document.getElementById("question-title");
    // let choicesButtonEl;
    // var feedbackAlert = document.getElementById("feedback");

    // var correctSound = new Audio("../sfx/correct.wav");
    // var incorrectSound = new Audio("../sfx/incorrect.wav");


    // let currentQuestionIndex =0;
    // let questionNumber =0;


    // let timerInterval; 
    // let timeLeft;
    // var finalScore =document.getElementById("final-score");
    var startBtn = document.getElementById("start");
    var time = document.getElementById("time");
    var startScreen = document.getElementById ("start-screen");
    var endScreen = document.getElementById ("end-screen");
    var questionsScreen = document.getElementById("questions");
    let currentQuestionIndex = 0;
    let questionNumber = 0;
    let choiceButtonEl;
    var feedbackAlert = document.getElementById("feedback");
    var questionTitleEl = document.getElementById("question-title");
    let timeLeft;
    let timeInterval;
    var finalScore =document.getElementById("final-score");
    
    // Use audio file
    const correctAudio = new Audio("./assets/sfx/correct.wav");
    const incorrectAudio = new Audio("./assets/sfx/incorrect.wav");
    
    startBtn.addEventListener("click", function () {
        startScreen.classList.add("hide");
        questionsScreen.classList.remove("hide");
        
        createOptionButton();
        startQuiz();
        displayQuestions();
    });
    
    document.getElementById("start").addEventListener("click", function () {
        correctAudio.play();
    });
    
    function startQuiz() {
        timeLeft = 100;
        timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            time.textContent = timeLeft;
            timeLeft--;
        
        } else {
            time.textContent = "time up";
            endQuiz();
        }
        }, 1000);
    }
    
    // Function to create option buttons
    function createOptionButton() {
        let choicesDiv = document.getElementById("choices");
        for (let i = 0; i < 5; i++) {
        let button = document.createElement("button");
        button.classList.add("choices-button");
        choicesDiv.appendChild(button);
        }
        choiceButtonEl = document.querySelectorAll(".choices-button");
        for (let i = 0; i < choiceButtonEl.length; i++) {
        choiceButtonEl[i].addEventListener("click", buttonsEventList);
        }
        feedbackAlert.classList.remove("hide");
    }
    
    // Function to display the current question and choices on the screen
    function displayQuestions() {
        currentQuestionIndex = quizQuestions[questionNumber];
        questionTitleEl.textContent = `Question ${questionNumber + 1}: ${
        currentQuestionIndex["question-title"]
        }`;
        for (let j = 0; j < currentQuestionIndex.choices.length; j++) {

        choiceButtonEl[j].textContent = currentQuestionIndex.choices[j];
        }
    }
    
    function buttonsEventList(event) {
        let selectedChoice = event.target.textContent;
        let currentQuestion = quizQuestions[questionNumber];
        if (selectedChoice === currentQuestion.answer) {
        feedbackAlert.textContent = "Your answer is correct!";
        correctAudio.play();
        setTimeout(function () {
            feedbackAlert.textContent = "";
            moveToNextQuestion();
        }, 1000);

        } else {
        timeLeft -= 5;
        feedbackAlert.textContent = "Your answer is wrong!";
        incorrectAudio.play();
        setTimeout(function () {
            feedbackAlert.textContent = "";
            moveToNextQuestion();
        }, 1000);
        }
    }
    
    // Move to the next question or end the quiz if all questions are answered
    function moveToNextQuestion() {
        if (questionNumber < quizQuestions.length - 1) {
        questionNumber++;
        displayQuestions();
        } else {
        console.log("Quiz completed!");
        endQuiz();
        }
    }
    
    // The quiz should end when all questions are answered or the timer reaches 0.
    function endQuiz() {
        displayScore();
        clearInterval(timeInterval);
        questionsScreen.classList.add("hide");
        endScreen.classList.remove("hide");
        feedbackAlert.classList.add("hide");
    }
    
    // Create function to display user total score based on total timeLeft
    function displayScore() {
        if (endQuiz) {
        finalScore.textContent = timeLeft;
        }
    }
    
    // Create eventListener for submit button on the end-screen
    // Select button element from end-screen and store it in a variable
    let submitBtn = document.querySelector("#submit");
    let highscoresArray = [];
    // Add eventListener to submitBtn
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let initials = document.querySelector("#initials").value;

        finalScore.textContent = timeLeft;
        highscores = { initials: initials, score: timeLeft };
        let highScoresLocStor = JSON.parse(localStorage.getItem("highscores"));
        if (highScoresLocStor === null) {
        highscoresArray.push(highscores);
        localStorage.setItem("highscores", JSON.stringify(highscoresArray));
        } else {
        highScoresLocStor.push(highscores);
        localStorage.setItem("highscores", JSON.stringify(highScoresLocStor));
        }
        location.href = "highscores.html";
    });