//classe da bola para organizar melhor.

import socket from "../index.js";
class Ball {

    //Construtor do paddle que recebe apenas a posição inicial como parametro.
    constructor(x,y){ 
        //Posição eixo x
        this.x = x;
        
        //Posição eixo y
        this.y = y;

        //Velocidade, defini como 2
        this.dx = 3;
        
        //Velocidade, defini como 2
        this.dy = -3;
        
        //Raio da bola
        this.radius = 4
    }

    // Funcao para atualizar o paddle, verifica qual variavel esta com valor = true e move o paddle na posicao desejada
    async updateBall(canvas, ballOwner){
        if(ballOwner){
            this.x += this.dx;
            this.y += this.dy;

        }
        
        if((this.x + this.radius) >= canvas.width && ballOwner){
            this.dx = -this.dx;    
            // socket.emit("ball_moved", [this.x, this.y, socket.id])     
            
        }
        else if(this.x <= 0 && ballOwner){
            this.dx = -this.dx;
            // socket.emit("ball_moved", [this.x, this.y, socket.id])     
        }
        
        if((this.y + this.radius) >= canvas.height && ballOwner){
            this.dy = -this.dy;           
            // socket.emit("ball_moved", [this.x, this.y, socket.id])     
            
        }
        else if(this.y <= 0 && ballOwner){
            this.dy = -this.dy;   
            // socket.emit("ball_moved", [this.x, this.y, socket.id])     
            
        }  
        if(ballOwner)
            socket.emit("ball_moved", [this.x, this.y, socket.id])        
    };


    updatePosition(possiton){
        this.x = parseInt(possiton.x)
        this.y = parseInt(possiton.y)
    }


    collides(target){
        if(this.x > target.x + target.width || target.x > this.x + this.radius){
            return false;
        }
                
        if((this.y - 2 > target.y + target.height || target.y > this.y + this.radius) && this.dy < 0){
            return false;
        }
    
        if (this.y + 2 > target.y + target.height || target.y > this.y + this.radius){
            return false;
        }

        return true;
    }



    //Função responsável por renderizar o jogador
    drawBall(context){
        
        context.beginPath();
        
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);

        context.fillStyle='#fff';
        context.fill();

        context.closePath();        
    };


    // Funcao para resetar a bola caso bata no chão 
    resetBall(canvas, paddle_Y){
        this.x = canvas.width/2;
        this.y = paddle_Y - this.radius;
        this.dy = -3;
        this.dx = 3;
    }

}

export default Ball