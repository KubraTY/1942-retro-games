class CollisionEffect {
    constructor(x, y) {
        this.element = document.createElement("img");
        this.element.src = "images/explosion3.png";
        this.element.className = "collision-effect";
        this.element.style.position = "absolute";
        this.element.style.width = "40px"; 
        this.element.style.height = "40px"; 
        this.element.style.left = `${x}px`; 
        this.element.style.top = `${y}px`; 

        document.getElementById("game-screen").appendChild(this.element);

        setTimeout(() => {
            this.remove();
        }, 300);
    }

    remove() {
        this.element.remove();
    }
}