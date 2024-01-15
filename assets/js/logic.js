/* <p>Your final score is <span id="final-score"></span>.</p>
<p>
  Enter initials: <input type="text" id="initials" max="3" />
  <button id="submit">Submit</button>
</p>
</div>

<div id="feedback" class="feedback hide"></div> */
import questions from "./questions";

var startBtn = document.getElementById("start");
var timeEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var correctSound = new Audio("assets/sfx/correct.wav");
var incorrectSound = new Audio("assets/sfx/incorrect.wav");
var endScreenEl = document.getElementById ("end-screen");


var timerInterval; 
// each question x25 sec; or simply input the number of seconds
var timeEl = questions.length *25;

function startQuiz() {
  timerInterval = setInterval(() => {
    time--;
    timeElement.textContent =time;
    if (time <=0) {
      endQuiz()
    }
  },5000);

}

function endQuiz(){
  clearInterval (timerInterval);
  questionsEl.setAttribute ("class","hide");
  endScreenEl.removeAttribute ("class");
}
startBtn.onclick = startQuiz;