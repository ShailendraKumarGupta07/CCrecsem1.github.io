width= (document.getElementById('gamearea').offsetWidth)-10;
height= (document.getElementById('gamearea').offsetHeight)-10;
// size = document.querySelector('.style').offsetWidth;
var gameareaheight = height;
var gameareawidth = width;
var snakemovementsize;
let audio = new Audio("gameover.wav");
if (window.matchMedia("(max-width: 870px) and (min-width: 500px)").matches) {
  snakemovementsize = 15;
}
else if( window.matchMedia("(max-width:500px) and (min-width:450px)").matches){
  snakemovementsize= 14;
}
else if( window.matchMedia("(max-width:450px) and (min-width:400px)").matches){
  snakemovementsize= 13;
}
else if( window.matchMedia("(max-width:400px) and (min-width:350px)").matches){
  snakemovementsize= 11;
}
else if( window.matchMedia("(max-width:350px) and (min-width:290px)").matches){
  snakemovementsize= 11;
}
 else {
  snakemovementsize = 25;
}

var snake=[{x:0, y:0}];
let initialdir = "none"; 
var foodgenerator = getrandomfood();
var score=0; 
var Currentscore=0;
let Highscore = localStorage.getItem("score2") || 0;
document.getElementById('score2').textContent = Highscore;

alert("WELCOME TO THE SNAKE GAME. PRESS Ok and Press any Arrow Key to Start the Game");
// 1. creating the body and food
function Gamezone(){
var gameArea =document.getElementById("gamearea");
gameArea.innerHTML= " ";
        
// creating snake body and food
snake.forEach( e => {
let snakebody = document.createElement("div");
snakebody.style.left= e.x +"px" ;
snakebody.style.top= e.y + "px" ;
snakebody.classList.add("style");
gameArea.appendChild(snakebody);
});

let food1 = document.createElement("div");
food1.style.left =  foodgenerator.x  + "px" ;
food1.style.top = foodgenerator.y + "px" ;
food1.id="food";
gameArea.appendChild(food1);
}

// 2. function to get random food
function getrandomfood(){
   return{
       x: Math.floor(Math.random()*((gameareawidth)/snakemovementsize))*snakemovementsize,
       y: Math.floor(Math.random()*((gameareaheight)/snakemovementsize))*snakemovementsize,
   };
}

//3. function to check collision with walls and with the snake itself
function collision(){
    var snakehead = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    
    if(
        snakehead.x<0 || snakehead.x>=gameareawidth || snakehead.y<0 || snakehead.y>=gameareaheight
    ){
        return true;
    }
}

// 4.function for updating the snake and updating the location of food when the snake eats it


function update() {
    const snakehead = { x: snake[0].x, y: snake[0].y };

    // 4.a.updating the movement of head and position 
    if (initialdir === "up") snakehead.y = snakehead.y-snakemovementsize;
    if (initialdir === "down") snakehead.y = snakehead.y+snakemovementsize;
    if (initialdir === "left") snakehead.x = snakehead.x-snakemovementsize;
    if (initialdir === "right") snakehead.x = snakehead.x+snakemovementsize;

    snake.unshift(snakehead);

    //4.b. Check if snake eats the food
    if (snakehead.x === foodgenerator.x && snakehead.y === foodgenerator.y) {
        foodgenerator = getrandomfood();
        // Score();
        score++;
        Currentscore++;
        document.getElementById('score1').textContent=score;
        document.getElementById('now').textContent= Currentscore;
        if(score>Highscore){
            Highscore=score;
            localStorage.setItem("score2", Highscore);
            document.getElementById('score2').textContent = Highscore;
        }
        

    } else {
        snake.pop();
    }
        if (collision()) {
            audio.play();
            alert("GAME OVER!!!! Kal Khelna");
            
        } else {
            Gamezone();
            setTimeout(update, 200);
        }
}


// 5.function for changing the direction(keyvalues were taken from the net)
function changedir(event) {
    var keyPressed = event.keyCode;
  
    if (keyPressed === 37) {
      if(initialdir !=="right"){
        initialdir="left";
      }
      else if( initialdir == "right"){
        initialdir="left";
      }
    } 
    else if (keyPressed === 39 ) {
        if(initialdir !=="left"){
            initialdir="right";
          }
          else if( initialdir == "left"){
            initialdir="right";
          }
    } 
    else if (keyPressed === 38 ) {
        if(initialdir !=="down"){
            initialdir="up";
          }
          else if( initialdir == "down"){
            initialdir="up";
          }
    } 
    else if (keyPressed === 40 ) {
        if(initialdir !=="up"){
            initialdir="down";
          }
          else if( initialdir == "up"){
            initialdir="down";
          }
    }
  }


// 6. function to increase score and high score
// function Score(){
//     score= score+1;
//     highscore= highscore+1;
//     document.getElementById('score1').textContent=score;
//     if(score<highscore){
//         document.getElementById('score2').textContent=highscore;
//     }
//     else if(score===highscore){
//         document.getElementById('score2').textContent=highscore;
//         if(score>highscore){
//             highscore=score;
//             document.getElementById('score2').textContent=highscore;
//         }
//     }

// }

// 7. function to move the snake on clicking the buttons


document.getElementById("up").addEventListener("click", function() {
  dir("up");
});
document.getElementById("down").addEventListener("click", function() {
  dir("down");
});
document.getElementById("left").addEventListener("click", function() {
  dir("left");
});
document.getElementById("right").addEventListener("click", function() {
  dir("right");
});

function dir(direction) {
  Gamezone();
  if (initialdir !== direction) {
    initialdir = direction;
  }
}


document.addEventListener("keydown", changedir);
update()

// calling of functions
// Gamezone();
