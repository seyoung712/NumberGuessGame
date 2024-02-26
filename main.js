//랜덤번호 지정
//유저가 번호를 입력하고 GO 버튼을 누름
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 = DOWN!
//랜덤번호 > 유저번호 = UP!
//Rest 버튼을 누르면 게임이 리셋
//5번의 기회를 다쓰면 게임이 끝난다 (버튼이 disable)
//유저가 범위 밖의 숫자를 입력하면 알려주고 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회를 깎지 않는다.

let computerNum
let playButton = document.getElementById("playButton"); //html에서 Go 버튼 가져오기
let userInput = document.getElementById("userInput"); //html에서 input box 값 가져오기
let resultArea = document.getElementById("resultArea"); //html에서 결과 영역 가져오기
let resetButton = document.getElementById("resetButton");
let chances = 5;
let gameOver = false
let chanceArea = document.getElementById("chanceArea");
let history = []; //유저가 입력했던 값들

playButton.addEventListener("click",play); //click 이벤트 발생 시 play 함수 실행
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){ //커서가 놓이면 값 초기화, 일회성 익명의 함수 사용
    userInput.value=""
})

function pickRandomNumber(){ //랜덤 값 출력
    computerNum = Math.floor(Math.random() * 100) + 1; //Math.random : 0~1 사이의 소수 반환 (1은 포함X)
    console.log("정답",computerNum);
}

function play() {
    let userValue = userInput.value;
    
    //유효성 검사
    if(userValue<1 || userValue>100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력해 주세요."
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 값을 입력해주세요."
        return;
    }

    chances--;
    chanceArea.textContent=`남은 기회 : ${chances}번`; //동적인 값 설정

    if(userValue < computerNum){
        resultArea.textContent = "Up!!!"
    } else if (userValue > computerNum){
        resultArea.textContent = "Down!!!"
    } else {
        resultArea.textContent = "정답!!!"
        playButton.disabled = true;
    }

    history.push(userValue); //배열 history에 유저가 입력했던 값들을 넣어줌
    
    if(chances < 1){
        gameOver = true;
    }
    if(gameOver){
        playButton.disabled = true;
    }
    
}

function reset() {
    //userInput창 clear
    userInput.value = "";

    //새로운 번호 생성
    pickRandomNumber();

    //결과창 초기화
    resultArea.textContent = "결과가 여기에 나옵니다.";
    chanceArea.textContent="남은 기회 : 5번";

    //history 초기화
    history.length = 0;
}

pickRandomNumber();

