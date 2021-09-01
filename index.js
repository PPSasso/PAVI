import Paddle from './components/Paddle.js'

//Seleciona a tag "canvas" la do index.html
const canvas = document.getElementById("breakout");

//Não entendi pq precisa disso, mas ele atribui o contexto do canvas pra 2d.
const context = canvas.getContext('2d');

//Isso foi mais um teste, depois tem que criar uma pasta só de estilos e colocar isso la, só pra organizar.
canvas.style.backgroundColor = "#222222"

var paddle = new Paddle(100, 300);


//Função responsável por renderizar o jogador
function drawPaddle(){
    context.fillStyle='#fff';
    
    context.fillRect(paddle.x, paddle.y, paddle.height, paddle.width);
}
drawPaddle();