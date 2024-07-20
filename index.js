let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../sounds/food.mp3');
const gameOverSound = new Audio('../sounds/gameover.mp3');
const moveSound = new Audio('../sounds/move.mp3');
const musicSound = new Audio('../sounds/music.mp3');
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [ { x: 13, y:10} ];
let food = { x: 4, y:6};

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000  < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 15 || snake[0].x <=0 || snake[0].y >= 15 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine() {
    musicSound.play();
    if (isCollide(snakeArray)) {
        musicSound.pause();
        gameOverSound.play();
        score  = 0;
        inputDir = { x: 0, y: 0 };
        snakeArray = [ { x: 13, y:10} ];
        alert("Game Over.Press Enter to play again.");
        musicSound.play();
    }

    if((snakeArray[0].y === food.y) && (snakeArray[0].x === food.x)){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2, b = 13;
        food = {x:Math.round(a+ (b-a)* Math.random()), y:Math.round(a+ (b-a)* Math.random())}
    }

    for(let i = (snakeArray.length - 2); i >= 0;i--){
        snakeArray[i+1] ={...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    board.innerHTML = "";
    snakeArray.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('snake-head');
        }else {
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snake-food');
    board.appendChild(foodElement);



}


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y :-1},
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});



// function repeatOften() {
//     $("<div />").appendTo("body");
//     requestAnimationFrame(repeatOften);
//   }