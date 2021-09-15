//Algumas constantes (Acho legal criar um arquivo só de constantes também)
//Altura, comprimento e distância da parte de baixo da tela, respectivamente.
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 70;


//classe do paddle para organizar melhor.
class Paddle {

    //Construtor do paddle que recebe apenas a posição inicial como parametro.
    constructor(x,y){ 
        //Posição eixo x
        this.x = x;
        
        //Posição eixo y
        this.y = y;

        //Velocidade, defini como 2
        this.dx = 4;
        
        //Altura
        this.height = PADDLE_HEIGHT;
        
        //Comprimento
        this.width = PADDLE_WIDTH;

        // variaveis da seta esquerda e direita, tem que começar com false.
        this.leftArrow = false

        this.rightArrow = false
    }

    // Funcao para atualizar o paddle, verifica qual variavel esta com valor = true e move o paddle na posicao desejada
    updatePaddle(canvas){
        
        /* Esse if que está certo, ele delimita o limite que o paddle avança, porém não esta funcionando pois o width do context está como "undefined",
        acredito que por conta da config feita no global.css em que o width fica como "100%"

        if(rightArrow && paddle.x + paddle.width < context.width){
            paddle.x += paddle.dx; 
        }*/ 


        // If sem limite de tela temporario, caso a variavel righArrow esteja como true (quando a seta de direita esta sendo pressionada), ele move o paddle pra direita
        if(this.rightArrow && ((this.x + this.width ) < canvas.width)){         
            this.x += this.dx;
        }     
        /* Else if para caso a seta da esquerda esteja pressionada, neste caso, tem a condição do eixo x do paddle seja maior que 0, 
        para que não ultrapasse o limite esquerdo da tela.*/
        else if(this.leftArrow &&  this.x > 0){
            this.x -= this.dx;
        }
    };

    //Função responsável por renderizar o jogador
    drawPaddle(context){

        context.fillStyle='#fff';
        
        context.fillRect(this.x, this.y, this.width, this.height);
    };

}

export default Paddle