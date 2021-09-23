class Level {
    constructor(bricks){
        this.bricks = bricks;
    }

    renderLevel(context){
        this.bricks.forEach(brick => {
            brick.drawBrick(context);
            
        });

    }

}

export default Level;