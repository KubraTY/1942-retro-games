class Game {

    constructor(){
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = null;
        this.height = 600;
        this.width = 500;
        this.enemies = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.player = new Player(
            this.gameScreen,
            200,
            500,
            59,
            43,
            "./images/plane.png"
        );
        this.enemy = new Enemy(this.gameScreen)
    }

    start(){
        this.gameScreen.style.height = `${this.height}px`; 
        this.gameScreen.style.width = `${this.width}px`; 

        this.gameScreen.style.display = 'block';
        this.startScreen.style.display = 'none';

        this.gameLoop()
    }

    gameLoop(){
        console.log("game loop")
        this.update();
        window.requestAnimationFrame(() => this.gameLoop())
    }

    update(){
        this.player.move();
        this.player.updateBullets();
        

        for(let i=0; i< this.enemies.length; i++){
            const enemy = this.enemies[i]
            enemy.move();

            if (enemy.top > this.height + 50) {
                enemy.element.remove();
                this.enemies.splice(i, 1);
                i--; // Adjust index after removing an element
            }
        }
        
    

        if (Math.random() > 0.98 && this.enemies.length < 5) {
            this.enemies.push(new Enemy(this.gameScreen));
        }
    }
}