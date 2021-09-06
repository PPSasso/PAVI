//Algumas constantes (Acho legal criar um arquivo só de constantes também)
//Altura, comprimento e distância da parte de baixo da tela, respectivamente.
const PADDLE_HEIGHT = 35;
const PADDLE_WIDTH = 7;
const PADDLE_MARGIN_BOTTOM = 50;

//classe do paddle para organizar melhor.
class Paddle {

    //Construtor do paddle que recebe apenas a posição inicial como parametro.
    constructor(x,y){
        //Posição eixo x
        this.x = x;

        //Posição eixo y
        this.y = y;
        
        //Velocidade, defini como 2
        this.dx = 2;
        
        //Altura
        this.height = PADDLE_HEIGHT;
        
        //Comprimento
        this.width = PADDLE_WIDTH;
    }
}

export default Paddle