//ZMIENNE

const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 30;

//pozycja piłki
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;
//ruch piłki
let ballSpeedX = -3;

//losowanie kąta piłeczki startowej
const min = -3;
const max = -1;

function getRandomIntInclusive(min, max) {

        const t = Math.random() 
        if(t < 0.5) {
            flag = -1;
        } else {
            flag = 1;
        }
    return Math.abs(Math.random() * (max - min + 1)) * flag;
  }
let ballSpeedY = getRandomIntInclusive(min, max);

//rakietki
const racketHeight = 100;
const racketWidth = 20;
//---------
const playerX = 70;
const aiX = cw - playerX - racketWidth;
let playerY = ch/2 - racketHeight/2;
let aiY = ch/2 - racketHeight/2;


//---------------------FUNKCJE--------------------------------------------------
function table() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0 ,cw, ch);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, ch/2 -1, cw, 2);
    ctx.fillRect(cw/2 - 3, 0, 6, ch)
}

function ball() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //piłka wyleciała na niekorzyść gracza - PRZGERANA
    if(ballX <= 0){
        ballSpeedY = 0; 
        ballSpeedX = 0;
        console.log("przegrałeś!")
    }

    //piłka wyleciala na korzyść gracza - WYGRANA
    if(ballX >= cw - ballSize){
        ballSpeedY = 0; 
        ballSpeedX = 0;
        console.log("wygrałes!")
    }

    //odbijacie od bocznych ścianek
    if(ballY <= 0 || ballY >= ch - ballSize) {
        ballSpeedY = -ballSpeedY 
        speedUp();
        console.log(ballY)
    }

    //odbicie rakietką gracza
    if((ballY + ballSize/2 >= playerY && ballY + ballSize/2 < playerY + racketHeight) && (ballX > playerX + racketWidth -5 && ballX < playerX + racketWidth + 5)) {
        ballSpeedX = -ballSpeedX
        speedUp();
    }

    //odbicie rakietką komputera

    if((ballY + ballSize/2 >= aiY && ballY + ballSize/2 < aiY + racketHeight) && (ballX > aiX - racketWidth - 10 && ballX < aiX - racketWidth + 5)) {
        ballSpeedX = -ballSpeedX
        speedUp();
    }

}

function racketPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(playerX, playerY, racketWidth, racketHeight);

}

function racketAi() {
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, racketWidth, racketHeight);

}

function aiPosition() {
    var midPosRacket = aiY + racketHeight/2;
    var midPosBall = ballY + ballSize/2;

    if(ballX > 500) {
        if(midPosRacket - midPosBall > 200){
            aiY -= 20;
        } else if(midPosRacket - midPosBall > 50){
            aiY -=10;
        }else if(midPosRacket - midPosBall < -200){
            aiY += 20;
        } else if(midPosRacket - midPosBall < -50){
            aiY += 10;
        }

    } else if (ballX <= 500 && ballX > 150) {
        if(midPosRacket - midPosBall > 100) {
            aiY -= 3;
        }else if(midPosRacket - midPosBall < 1100) {
            aiY += 3;
        }
    }
}


topCanvas = canv.offsetTop;

canv.addEventListener('mousemove', function(e) {
   playerY = e.clientY - topCanvas - racketHeight/2;

   if(playerY >= ch - racketHeight) {
       playerY = ch - racketHeight
   }
   if(playerY <= 0) {
       playerY = 0;
   }

//    aiY = playerY;
})



function speedUp() {
    if(ballSpeedX > 0 && ballSpeedX < 10) {
        ballSpeedX += 0.3;
    }
    if(ballSpeedX < 0 && ballSpeedX > -10) {
        ballSpeedX -= 0.3;
    }
    if(ballSpeedY > 0 && ballSpeedY < 10) {
        ballSpeedY += 0.2;
    }
    if(ballSpeedY < 0 && ballSpeedY > -10) {
        ballSpeedY -= 0.2;
    }

}


console.log()

function game() {
    table()
    ball()
    racketPlayer()
    racketAi()
    aiPosition()
    
}


setInterval(game, 15);

