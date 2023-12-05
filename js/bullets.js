class Bullet {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionY = -1; 
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.gameScreen.appendChild(this.element);

        this.isActive = true;
    }

    move() {
        this.top += this.directionY;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
    }

    didShooted(enemy) {
        if (this.isActive) {
          const bulletRect = this.element.getBoundingClientRect();
          const enemyRect = enemy.element.getBoundingClientRect();
    
          if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
          ) {
            // Deactivate the bullet on hitting an enemy
            this.isActive = false;
            return true;
          }
        }
    
        return false;
      }
}