import Paddle from './components/Paddle.js'

// Variavel da imagem, acredito que o certo é deixar em outro lugar, mas deixei aqui pra testes.
const BG = new Image();
BG.src = "imagens/bg.png"

// variaveis da seta esquerda e direita, tem que começar com false.
let leftArrow = false;
let rightArrow = false;

//Seleciona a tag "canvas" la do index.html
const canvas = document.getElementById("breakout");

//Não entendi pq precisa disso, mas ele atribui o contexto do canvas pra 2d.
const context = canvas.getContext('2d');

//Isso foi mais um teste, depois tem que criar uma pasta só de estilos e colocar isso la, só pra organizar.
canvas.style.backgroundColor = "#222222"

var paddle = new Paddle(130, 130);


//Função responsável por renderizar o jogador
function drawPaddle(){
    context.fillStyle='#fff';
    
    context.fillRect(paddle.x, paddle.y, paddle.height, paddle.width);
}

// Funcao que permite que cada vez que a seta da esquerda ou direita do teclado esteja pressionada, mude o valor da variavel desejada para truwe.
document.addEventListener("keydown", function(event){
    // keycode 37 = seta da esquerda. Verificar depois uma alternativa para o keycode, pois o mesmo esta deprecated (não é bom deixar)
    if(event.keyCode == 37){
        leftArrow = true;
    } 
    // keycode 39 = seta da direita
    else if (event.keyCode == 39){
        rightArrow = true;
    }
});

// Funcao que permite que cada vez que a seta da esquerda ou direita do teclado nao esteja pressionada, mude o valor da variavel desejada para false.
document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    } else if (event.keyCode == 39){
        rightArrow = false;
    }
});


// Funcao para mover o paddle, verifica qual variavel esta com valor = true e move o paddle na posicao desejada
function movePaddle(){
    
    /* Esse if que está certo, ele delimita o limite que o paddle avança, porém não esta funcionando pois o width do context está como "undefined",
       acredito que por conta da config feita no global.css em que o width fica como "100%"

    if(rightArrow && paddle.x + paddle.width < context.width){
        paddle.x += paddle.dx; 
    }*/ 


    // If sem limite de tela temporario, caso a variavel righArrow esteja como true (quando a seta de direita esta sendo pressionada), ele move o paddle pra direita
    if(rightArrow){         
        paddle.x += paddle.dx;
    }     
    /* Else if para caso a seta da esquerda esteja pressionada, neste caso, tem a condição do eixo x do paddle seja maior que 0, 
    para que não ultrapasse o limite esquerdo da tela.*/
    else if(leftArrow &&  paddle.x > 0){
        paddle.x -= paddle.dx;
    }
};

// Funcao para desejar o paddle, mais pra frente será colocado mais configs aqui dentro para melhorar o paddle
function draw(){
    drawPaddle();
}


// Função principal do programa. Fica um loop eterno para que as alterações sejam feitas em tempo real
function loop(){

    // Move o paddle toda hora (sempre que uma tecla esteja ativa)
    movePaddle();

    // Coloca o background na tela (serve para limpar a tela e o local do paddle anterior)
    context.drawImage(BG, 0, 0);

    // Desenha o paddle no local atualizado
    draw();

    // inicia a funcao loop novamente 
    requestAnimationFrame(loop);
}

// Entra no loop
loop();