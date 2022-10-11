let inputDir = {x: 0, y: 0}
let lastPaintTime = 0;
let speed  = 15;
let snakearr = [
{x: 13, y: 15}
]
let food = {x: 6, y: 7}
let score = 0;


function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true
    }
}

function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime =  ctime;
    gameEngine()
}

function gameEngine(){
    //part 1 : Updating the snake array
    if(isCollide(snakearr)){
        inputDir = {x: 0, y: 0}
        alert('Game over')
        snakearr = [{x: 13, y: 15}]
        score = 0;
        scoreBox.innerHTML = "Score: 0 "
    }

    //khane khaa le to kya hoga 
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        score += 1;
        if(score> hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval
        }
        scoreBox.innerHTML = "Score: " + score
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) }
    }

    //Moving the snake 
    for (let i = snakearr.length - 2; i >= 0; i--){
        snakearr[i + 1] = {...snakearr[i]};
    }

    snakearr[0].x += inputDir.x
    snakearr[0].y += inputDir.y

    //part 2  Display the snake and food
    //snake dispay
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        snakeElement.classList.add('snake')
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    //food ko display
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}


let hiscore = localStorage.getItem('hiscore')
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = " HiScore : " + hiscore
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "ArrowDown":
            console.log('ArrowDown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log('ArrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})