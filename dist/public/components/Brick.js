const BRICK_HEIGHT = 15;
const BRICK_WIDTH = 35;

class Brick {
    constructor(x,y){ 
        //Posição eixo x
        this.x = x;
        
        //Posição eixo y
        this.y = y;

        //Altura
        this.height = BRICK_HEIGHT;
        
        //Comprimento
        this.width = BRICK_WIDTH;

        //Se ja acertaram ele ou não
        this.render = true;
    }

    drawBrick(context){

        context.fillStyle='#fff';
        
        if(this.render){
            context.fillRect(this.x, this.y, BRICK_WIDTH, BRICK_HEIGHT);
        }
    };
}

export default Brick;