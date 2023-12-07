class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.supportedFormats = ['audio/mp3', 'audio/wav']; // Add more formats if needed
    }

    load(src) {
        const supportedSrc = this.getSupportedSource(src);
        this.audio.src = supportedSrc;
        this.audio.preload = 'auto';
    }

    play() {
        if (this.audio.readyState >= 2) { // Check if audio is loaded (2 means loaded)
            this.audio.play();
        } else {
            // If not loaded, wait for the 'canplay' event before playing
            this.audio.addEventListener('canplay', () => {
                this.audio.play();
            });
        }
    }

    stop() {
        this.audio.volume = 0
        this.audio.pause();
        this.audio.currentTime = 0;
        console.log("sound stop")
    }

    getSupportedSource(src) {
        for (const format of this.supportedFormats) {
            const supportedSrc = `${src}.${format.split('/')[1]}`;
            if (this.audio.canPlayType(format)) {
                return supportedSrc;
            }
        }
        return src; // Fallback to the original source if no supported format is found
    }
}