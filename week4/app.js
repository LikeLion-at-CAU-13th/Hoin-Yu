// 1. js 파일에서 접근해야 하는 html dom 요소 선언
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

const computerText = document.getElementById("computer-hand-text")
const computerIcon = document.getElementById("computer-hand-icon")

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

const myScore = document.getElementById("my-score");
const comScore = document.getElementById("com-score");
const winning = document.getElementById("display-result")

const resetBtn = document.getElementById("reset-button")

// HTML에서 추가한 버튼 선택
const toggleButton = document.getElementById('darkModeToggle');

//2. 이벤트 설정
rockBtn.addEventListener("click", displayMyChoice);
scissorsBtn.addEventListener("click", displayMyChoice);
paperBtn.addEventListener("click", displayMyChoice);

resetBtn.addEventListener("click", resetGame);

document.addEventListener('DOMContentLoaded', () => {
    // 클릭 이벤트 - body와 모든 요소의 색상 반전
    toggleButton.addEventListener('click', () => {
      // body와 모든 요소 색상 반전
      document.body.classList.toggle('change-reverse');
      document.querySelectorAll('.contents, .title, .fa-regular').forEach(el => {
        if (document.body.classList.contains('change-reverse')) {
          el.style.borderColor = 'white';
        } else {
          el.style.borderColor = 'black';
        }
      });
    });
  });

//3. displayMyChoice 함수 작성
function displayMyChoice(e) {
    let clickedBtn = e.currentTarget.id;
    let clickedIcon = e.target.className;

      
    myHandText.innerText = clickedBtn;
    myHandIcon.className = clickedIcon;

    Start(clickedBtn)
}

//4. 랜덤으로 내는 컴퓨터
function getComChoice() {
    const randomValue = {
        0 : ["rock", "fa-regular fa-hand-back-fist change"],
        1 : ["scissors", "fa-regular fa-hand-scissors fa-rotate-90 change"],
        2 : ["paper", "fa-regular fa-hand change"]

    };
    const randomIndex= Math.floor(Math.random() * 3);

    return randomValue[randomIndex]

}

// 5. 컴퓨터의 선택이 화면에 보이도록 하는 함수
function displayComChoice(result) {
    computerText.innerText = result[0];
    computerIcon.className = result[1];
}

//6. start 함수
function Start(myChoice) {
    let resultArray = getComChoice();
    //let comChoice= resultArray[0];
    displayComChoice(resultArray);
    displayWin(whoWin(myChoice, resultArray[0]))
}

//7. 승패 return
function whoWin(myChoice, comChoice) {
    let winResult = ""

    if (myChoice === comChoice) {
        winResult = "tie"
    }
    else if (myChoice === "rock") {
        if (comChoice === "scissors") {
            winResult = "win"
        }
        else if (computerText.innerText === "paper") {
            winResult = "lose"
        }
    }
    else if (myChoice === "scissors") {
        if (comChoice === "paper") {
            winResult = "win"
        }
        else if (comChoice === "rock") {
            winResult = "lose"
        }
    }
    else if (myChoice === "paper") {
        if (comChoice === "rock") {
            winResult = "win"
        }
        else if (comChoice === "scissors") {
            winResult = "lose"
        }
    }
    return winResult

}


//8. 승패 표시
function displayWin(winResult) {
    let myCount = Number(myScore.textContent)
    let comCount = Number(comScore.textContent)

    winning.innerText = winResult //winning = winResult가 아닌 .innertext로 값을 업데이트해야 함
    if (winResult === "win") {
        myCount = myCount + 1;
        myScore.textContent = myCount;

    }
    else if (winResult === "lose") {
        comCount = comCount + 1;
        comScore.textContent = comCount;


    }
    else {

    }
}

//상태 초기화 버튼 구현 함수
function resetGame() {
    let myCount = Number(myScore.textContent);
    let comCount = Number(comScore.textContent);
    winning.innerText = "";
    myCount = 0;
    comCount = 0;

    myScore.textContent = myCount;
    comScore.textContent = comCount;


    myHandIcon.className = null;
    myHandText.innerText = null;
    computerIcon.className = null;
    computerText.innerText = null;
}

