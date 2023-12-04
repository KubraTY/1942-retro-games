class Player {

    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement("img")
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.gameScreen.appendChild(this.element);

        this.bullet = null;
        this.bullets = [];

    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;

        if (this.left < 10) {
            this.left = 10;
        }
        if (this.top < 10) {
            this.top = 10;
        }

        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }
        if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
            this.top = this.gameScreen.offsetHeight - this.height - 10;
        }

        this.updatePosition();
        this.updateBullets();
    }


    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    shoot() {
        // Check if there is an existing bullet, if not, create a new one
        this.bullet = new Bullet(
            this.gameScreen,
            this.left + this.width / 2 - 5,
            this.top,
            10,
            20,
            "./images/userBullet.png"
        );
        this.bullets.push(this.bullet);
    }

    updateBullets() {
        // Update the position of all bullets in the array
        this.bullets.forEach((bullet, index) => {
            bullet.move();

            // Remove the bullet from the array when it goes off the screen
            if (bullet.top + bullet.height < 0) {
                this.bullets.splice(index, 1);
            }
        });
    }
}