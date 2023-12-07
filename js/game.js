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
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.gameScreen.appendChild(this.element);
        this.live = document.createElement("div");
        this.live.style.position = "absolute";
        this.live.style.width = `${this.width / 4}px`;
        this.live.style.height = `${this.height}px`;
        this.gameScreen.appendChild(this.live);

        this.soundE = new AudioPlayer();
        this.soundB = new AudioPlayer();
        this.loadedSoundB = this.soundB.load('sounds/bgm_medium')
        this.loadedSoundE  = this.soundE.load('sounds/enemy_destroy')
        this.soundB.audio.volume = 0.1;
        this.soundE.audio.volume = 0.4;

    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.gameScreen.style.display = 'block';
        this.startScreen.style.display = 'none';
        this.gameLoop()
    }

    gameLoop() {
        //console.log("game loop")
        if (this.lives === 0) {   
            //this.soundB.stop();
            this.endGame();
            return
        } else {
            
            this.soundB.play();
            this.update();
        }

        window.requestAnimationFrame(() => this.gameLoop())
    }

    update() {
        this.player.move();
        this.player.updateBullets();

        //Show score and lives in the gameScreen
        this.element.innerText = this.score;
        this.element.classList.toggle("score-num")

        this.live.classList.toggle("gameScreen-lives")
        this.live.innerText = `lives ` + this.lives

        //Enemy logic
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i]
            enemy.move();

            //player-enemy collide
            if (this.player.didCollide(enemy)) {
                // Remove the enemy element from the DOM
                enemy.element.remove();
                this.enemies.splice(i, 1);
                this.lives--;
                i--;

                this.soundE.play();
                const collisionEffect = new CollisionEffect(enemy.left, enemy.top);
            }

            //enemy shooted
            for (let j = 0; j < this.player.bullets.length; j++) {
                const bullet = this.player.bullets[j];
                if (bullet.didShooted(enemy)) {
                    // Handle bullet-enemy collision
                    enemy.element.remove();
                    this.enemies.splice(i, 1);
                    this.score += 10;
                    this.element.innerText = this.score
                    console.log(this.score)
                    // Deactivate the bullet after hitting an enemy
                    bullet.isActive = false;
                    i--;

                    this.soundE.play();
                    const collisionEffect = new CollisionEffect(enemy.left, enemy.top);
                }
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

        this.gameIsOver = true;

        this.soundB.stop()

        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.startScreen.style.display = "block";

        document.querySelector(".score-num").innerText = this.score.toString();
        document.querySelector("#start-button").style.display = "none";
        document.querySelector("#restart-button").style.display = "block";
        document.querySelector(".game-over").style.display = "block";

    }
}