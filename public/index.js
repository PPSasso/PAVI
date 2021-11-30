
//Global variables
// var socket = io.connect({ query: "type=controller" });
import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js';
import Brick from './components/Brick.js';

const socket = io()

//Seleciona a tag "canvas" la do index.html
const canvas = document.getElementById("breakout");

//Não entendi pq precisa disso, mas ele atribui o contexto do canvas pra 2d.
const context = canvas.getContext('2d');

// Variavel da imagem, acredito que o certo é deixar em outro lugar, mas deixei aqui pra testes.
var BG = new Image();
BG.src = "imagens/background_.jpg";

var LIFE_IMAGE = new Image();
LIFE_IMAGE.src = "imagens/life.png";

var POINTS = new Image();
POINTS.src = "imagens/points.png";


//Isso foi mais um teste, depois tem que criar uma pasta só de estilos e colocar isso la, só pra organizar.
canvas.style.backgroundColor = "#222222"

var Players = []
var gameStarted = false


var paddle = new Paddle(500,500);
var remotePaddle = new Paddle(500,500);
var ball = new Ball(paddle.x + 2, paddle.y - 50);
var player_level = 2;
var bricks = levelMaker(player_level);
var player_life = 3;
var player_points = 0;

//Controle de movimentação do player ( R | L )
// socket.on("right", data => {
//     paddle.rightArrow = true;
// });


// socket.on("left", data => {
//     paddle.leftArrow = true;
// });

//Gerenciamento de entradas de novos players

socket.on("new_player_connected", ([players, hasGameStarted]) => {
    // socket.send("Novo player")
    // players.push(new Paddle(500,500))
    // canvas.style.right = "98vh";

    if(hasGameStarted) {
        loop();
    }
    console.log("Novo jogador conectado", [players, hasGameStarted]);
})

// Funcao que permite que cada vez que a seta da esquerda ou direita do teclado esteja pressionada, mude o valor da variavel desejada para truwe.
document.addEventListener("keydown", function(event){
    // keycode 37 = seta da esquerda. Verificar depois uma alternativa para o keycode, pois o mesmo esta deprecated (não é bom deixar)
    if(event.keyCode == 37){
        paddle.leftArrow = true;
    } 
    // keycode 39 = seta da direita
    else if (event.keyCode == 39){
        paddle.rightArrow = true;
    }
});

// Funcao que permite que cada vez que a seta da esquerda ou direita do teclado nao esteja pressionada, mude o valor da variavel desejada para false.
document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        paddle.leftArrow = false;
    } else if (event.keyCode == 39){
        paddle.rightArrow = false;
    }
    
});

// Função principal do programa. Fica um loop eterno para que as alterações sejam feitas em tempo real
async function loop(){
    
    // Move o paddle toda hora (sempre que uma tecla esteja ativa)
    paddle.updatePaddle(canvas);
    remotePaddle.updatePaddle(canvas);
    
    ball.updateBall(canvas);
    
    // Coloca o background na tela (serve para limpar a tela e o local do paddle anterior)
    context.drawImage(BG, 0, 0);

    socket.on("playerHasMoved", (infos) => {
        if(infos[1] !== socket.id)
            remotePaddle.x = infos[0];
    })    
    
    // Caso a bola bata no chao, ela é resetada para a posição inicial
    if(ball.y + ball.radius > canvas.height){
        ball.resetBall(canvas, paddle.y);
        player_life --;

        // Verifica se o player não tem mais vida
        if(player_life == 0){
            showDefeat();
        }
    }

    if(ball.collides(paddle) && ball.dy > 0){
        ball.y = paddle.y - 1;
        ball.dy = -ball.dy;
        
        //Se bater do lado esquerdo do paddle e a bola estiver indo pra direita, ela vai pra esquerda
        if(paddle.x+(paddle.width/2) > ball.x+ball.radius && ball.dx > 0){
            ball.dx = -ball.dx;
        }

        //Se bater do lado direito do paddle e a bola estiver indo pra esquerda, ela vai pra direita
        if(paddle.x+(paddle.width/2) < ball.x+ball.radius && ball.dx < 0){
            ball.dx = -ball.dx;
        }

        
    }
    
    bricks.forEach(brick =>{
        if(ball.collides(brick) && brick.render){
            if(ball.x + 2 < brick.x && ball.dx > 0){
                ball.dx = -ball.dx;
                brick.render=false;
            }
            else if(ball.x + 6 > brick.x + brick.width && ball.dx < 0){
                ball.dx = -ball.dx;
                brick.render=false;
            }
            else if(ball.y < brick.y){
                ball.dy = -ball.dy
                brick.render=false;
            }
            else{
                ball.dy = -ball.dy
                brick.render=false;
            }
            player_points += 10;
            
        }
    })

    // Desenha o paddle no local atualizado
    /* 
       Verifica se o level já acabou, caso já tenha acabado, aumenta o level (aumenta uma fileira)
       Aqui tem que colocar mais propriedades de acordo com a ideia do nosso jogo, no caso só coloquei que aumenta uma vida caso o jogador não esteja com vida cheia 
       e coloquei para ele ganhar 1000 pontos, mas tem que colocar esquema para aumentar velocidade da bola, etc
    */
    if(levelIsDone(bricks)){
        player_level++;
        console.log(player_level)
        bricks = levelMaker(player_level);
        if(player_life != 3)
            player_life ++;
        player_points += 1000;    
    }

    // inicia a funcao loop novamente 
    if(player_life != 0 ){
        requestAnimationFrame(loop);
    }
    draw();

}

// Funcao para desenhar o paddle, mais pra frente será colocado mais configs aqui dentro para melhorar o paddle
function draw(){
    paddle.drawPaddle(context);
    remotePaddle.drawPaddle(context);

    ball.drawBall(context);
    bricks.forEach(brick =>{
        brick.drawBrick(context);
    })

    // Funcão para desenhar os corações dependendo de quantas vidas o jogador tem
    draw_player_life(player_life);
    
    context.drawImage(POINTS, 55, 5, 25, 25);
    context.fillStyle = "#FFF";
    context.font = "25px Germania One";
    context.fillText(player_points, 80, 25)
    
}


//Isso aqui ta uma bagunça ainda, vou arrumar quando tiver saco kkk -Sasso
function levelMaker(level){
    const bricks = [];
    // Y significa o Level, entao se o level for 1, tera apenas uma fileira e assim por diante. Cada fileira tera 23 blocos.
    for (let y = 0; y < level; y++) {
        for (let x = 0; x < 23; x++) {
            let brick = new Brick(x*37+ 60, 35 + y*18);
            bricks.push(brick);   
        }                
    }
    

    return bricks;
}

console.log([Players, gameStarted]);
// Entra no loop


// Tela meio escura quando o jogador perde.
const gameover = document.getElementById("gameover");

// Imagem do game over
const defeat = document.getElementById("defeat");

// Texto do botão de restart
const restart = document.getElementById("restart");

// Quando o jogador perde
function showDefeat(){
    gameover.style.display = "block";
    defeat.style.display = "block";
}

// Quando clica em "Play again", o jogo da o restart
restart.addEventListener("click", function(){
    location.reload(); 
})

// Funcão para desenhar os corações dependendo de quantas vidas o jogador tem
function draw_player_life(player_life){
    if(player_life == 3){
        context.drawImage(LIFE_IMAGE, canvas.width-55, 5, 25, 25);
        context.drawImage(LIFE_IMAGE, canvas.width-85, 5, 25, 25);
        context.drawImage(LIFE_IMAGE, canvas.width-115, 5, 25, 25);
    }else if(player_life == 2){
        context.drawImage(LIFE_IMAGE, canvas.width-55, 5, 25, 25);
        context.drawImage(LIFE_IMAGE, canvas.width-85, 5, 25, 25);
    } else if(player_life == 1){
        context.drawImage(LIFE_IMAGE, canvas.width-55, 5, 25, 25);
    }
}


// Função para verificar se todos os blocos já foram quebrados, caso já tenham sido, retorna verdadeiro.
function levelIsDone (bricks){
    var bool = true
    bricks.forEach(brick =>{
        if(brick.render){ 
            bool = false;                  
        }
    })  
    return bool;
}

export default socket