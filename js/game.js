class Game {

    constructor() {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
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
            "images/plane.png"
        );
        this.enemy = new Enemy(this.gameScreen)
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.gameScreen.style.display = 'block';
        this.startScreen.style.display = 'none';

        this.gameLoop()
    }

    gameLoop() {
        console.log("game loop")
        this.update();
        window.requestAnimationFrame(() => this.gameLoop())
    }

    update() {
        this.player.move();
        this.player.updateBullets();


        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i]
            enemy.move();

            if (this.player.didCollide(enemy)) {
                // Remove the enemy element from the DOM
                enemy.element.remove();
                // Remove enemy object from the array
                this.enemies.splice(i, 1);
                // Reduce player's lives by 1
                this.lives--;
                //document.getElementById('lives').innerText = this.lives
                // Update the counter variable to account for the removed obstacle
                i--;
            }
            
            if(this.lives === 0){
                this.endGame();
            }

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

    endGame() {
        this.player.element.remove();
        this.enemies.forEach(enemy => enemy.element.remove());
    
        this.gameIsOver = true;
    
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.startScreen.style.display = "block";
        document.querySelector("#start-button").style.display = "none";
        document.querySelector("#restart-button").style.display = "block";
        document.querySelector(".game-over").style.display = "block";
        
      }
}