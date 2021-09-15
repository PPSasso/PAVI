import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js'

// Variavel da imagem, acredito que o certo é deixar em outro lugar, mas deixei aqui pra testes.
const BG = new Image();
BG.src = "imagens/bg.png"

//Seleciona a tag "canvas" la do index.html
const canvas = document.getElementById("breakout");

//Não entendi pq precisa disso, mas ele atribui o contexto do canvas pra 2d.
const context = canvas.getContext('2d');

//Isso foi mais um teste, depois tem que criar uma pasta só de estilos e colocar isso la, só pra organizar.
canvas.style.backgroundColor = "#222222"

var paddle = new Paddle(500,500);
var ball = new Ball(paddle.x + 2, paddle.y - 50);

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
}


// Função principal do programa. Fica um loop eterno para que as alterações sejam feitas em tempo real
function loop(){
    
    // Move o paddle toda hora (sempre que uma tecla esteja ativa)
    paddle.updatePaddle(canvas);
    
    ball.updateBall(canvas);
    
    // Coloca o background na tela (serve para limpar a tela e o local do paddle anterior)
    context.drawImage(BG, 0, 0);
    
    if(ball.collides(paddle)){
        ball.dy = -ball.dy;
        
    }

    // Desenha o paddle no local atualizado
    draw();

    // inicia a funcao loop novamente 
    requestAnimationFrame(loop);
}

// Entra no loop
loop();