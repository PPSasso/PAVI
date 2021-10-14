import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js';
import Brick from './components/Brick.js';
import Level from './utilities/Level.js';

//Seleciona a tag "canvas" la do index.html
const canvas = document.getElementById("breakout");

//Não entendi pq precisa disso, mas ele atribui o contexto do canvas pra 2d.
const context = canvas.getContext('2d');

// Variavel da imagem, acredito que o certo é deixar em outro lugar, mas deixei aqui pra testes.
var BG = new Image();
BG.src = "imagens/background_.jpg";

//Isso foi mais um teste, depois tem que criar uma pasta só de estilos e colocar isso la, só pra organizar.
canvas.style.backgroundColor = "#222222"

var paddle = new Paddle(500,500);
var ball = new Ball(paddle.x + 2, paddle.y - 50);
var bricks = levelMaker();
var player_life = 3;

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


// Funcao para desejar o paddle, mais pra frente será colocado mais configs aqui dentro para melhorar o paddle
function draw(){
    paddle.drawPaddle(context);
    ball.drawBall(context);
    bricks.forEach(brick =>{
        brick.drawBrick(context);
    })

}


// Função principal do programa. Fica um loop eterno para que as alterações sejam feitas em tempo real
function loop(){
    
    // Move o paddle toda hora (sempre que uma tecla esteja ativa)
    paddle.updatePaddle(canvas);
    
    ball.updateBall(canvas);
    
    // Coloca o background na tela (serve para limpar a tela e o local do paddle anterior)
    context.drawImage(BG, 0, 0);
    
    // Caso a bola bata no chao, ela e resetada para a posição inicial
    if(ball.y + ball.radius > canvas.height){
        ball.resetBall(canvas, paddle.y);
        player_life --;
        if(player_life == 0){
                end_game();
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
            
        }
    })

    // Desenha o paddle no local atualizado
    draw();

    // inicia a funcao loop novamente 
    requestAnimationFrame(loop);

}

//Isso aqui ta uma bagunça ainda, vou arrumar quando tiver saco kkk -Sasso
function levelMaker(){
    const bricks = [];

    for (let index = 0; index < 67; index++) {
        if(index > 21 && index < 44){
            let brick = new Brick(index*37-760, 58);
            bricks.push(brick);            
        }
        else if(index > 44){
            let brick = new Brick(index*37-1600, 76);
            bricks.push(brick);            
        }
        else{
            let brick = new Brick(index*37+50, 40);
            bricks.push(brick); 
        }
    }

    return bricks;
}

// Depois era interessante colocar em um lugar separado, ta bem feio assim -- Rodrigo
function end_game(){
    // Aqui seria o lugar que sera colocado uma tela de game over, mas deixei windows alert por enquanto
    window.alert("GAME OVER");
}

// Entra no loop
loop();