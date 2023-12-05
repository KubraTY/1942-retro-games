window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const keyboardControlsButton = document.getElementById("keyboard-controls");


    startButton.addEventListener("click", function () {
        startGame();
    });

    restartButton.addEventListener("click", function () {
        startGame();
        location.reload();
    });
    

    function startGame() {
        console.log("start game");

        game = new Game();

        game.start();
    }

    /*
    function restartGame() {
        location.reload();
        startGame();
    } */
    

    keyboardControlsButton.addEventListener("click", function () {
        toggleControlsVisibility();
    });

    function toggleControlsVisibility() {
        const controlsList = document.querySelector('.show-controls');
        controlsList.classList.toggle('visible');
    }

    function handleKeydown(event) {
        const key = event.code;

        // Check if the pressed key is one of the arrow keys or the "Z" key
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyZ'].includes(key)) {
            event.preventDefault();

            // Update player's directionX and directionY based on the key pressed
            switch (key) {
                case 'ArrowUp':
                case 'KeyW':
                    //console.log('Go up!');
                    game.player.directionY = -1;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    //console.log('Go down!');
                    game.player.directionY = 1;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    //console.log('Go left!');
                    game.player.directionX = -1;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    //console.log('Go right!');
                    game.player.directionX = 1;
                    break;
                case 'KeyZ':
                    //console.log('Shoot!');
                    game.player.shoot();
                    break;
            }

            // Handle keyup events
            document.addEventListener('keyup', (event) => {
                if (
                    ['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS'].includes(event.code)
                ) {
                    //console.log('Stop moving on Y');
                    game.player.directionY = 0;
                }
                if (
                    ['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD'].includes(event.code)
                ) {
                    //console.log('Stop moving on X');
                    game.player.directionX = 0;
                }
            });
        }
    }
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
};