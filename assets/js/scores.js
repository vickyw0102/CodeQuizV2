    function displayScoreInitials() {
        let highscoresFromLocalStorage = JSON.parse(
        localStorage.getItem("highscores"),
        );
        console.log(highscoresFromLocalStorage);
        highscoresFromLocalStorage.sort(function scoreOrder(a, b) {
        return b.score - a.score;
        });
    
        // Select parent ol element
        if (highscoresFromLocalStorage) {
        let olEl = document.querySelector("#highscores");
        for (let i = 0; i < highscoresFromLocalStorage.length; i++) {
            
            let liEl = document.createElement("li");
            liEl.textContent =
            highscoresFromLocalStorage[i].initials +
            " - " +
            highscoresFromLocalStorage[i].score;
            olEl.appendChild(liEl);
        }
        }
    }
    
    displayScoreInitials();

    let clearBtn = document.querySelector("#clear");
    
    clearBtn.addEventListener("click", function () {
        
        let finalScore = document.querySelector("#highscores");
        localStorage.removeItem("highscores");
        localStorage.removeItem("saved-initials");
        localStorage.removeItem("saved-finalScore");
        finalScore.innerHTML = "";
    });
    