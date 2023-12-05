class Enemy {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 400 + 50);
        this.top = -80;
        this.width = 46;
        this.height = 36;
        this.element = document.createElement("img");
        this.element.src = "images/enemy0.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.gameScreen.appendChild(this.element);

    }
    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
    move() {
        console.log("enemy.move")

      this.top += 3;

      this.updatePosition();
    }
}