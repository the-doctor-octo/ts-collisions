
export abstract class Game {
    canvasWidth: number = 0;
    canvasHeight: number = 0;
    canvas: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D | null | undefined;
    lastUpdateTime: number = 0;
    deltaTime: number = 0;
    frameInterval: number = 0
    debug: { init: boolean, update: boolean, render: boolean } = {
        init: false,
        update: false,
        render: false
    }

    constructor(canvas: HTMLCanvasElement | null, canvasWidth: number, canvasHeight: number, fps: number = 30) {
        if (canvas === null) {
            console.error(`%c *** Error, Canvas cannot be null`, `background:#222; color: #FFda55`)
            return;
        }
        this.canvas = canvas
        this.canvas.width = this.canvasWidth = canvasWidth;
        this.canvas.height = this.canvasHeight = canvasHeight;

        this.ctx = this.canvas.getContext('2d');

        this.lastUpdateTime = 0;
        this.deltaTime = 0;

        this.frameInterval - 1000 / fps
        this.init();
    }

    init(): void {
        // Initialize game objects, resources, etc.
        if (this.debug.init)
            console.log(`%c *** Init`, `background:#020; color:#adad00`)
    }

    update(deltaTime: number): void {
        // Update game state based on deltaTime
        if (this.debug.update)
            console.log(`%c *** Update`, `background:#020; color:#adad00`)
    }

    render(): void {
        // Render game objects
        if (this.debug.render)
            console.log(`%c *** Render`, `background:#020; color:#adad00`)
    }

    gameLoop(timestamp: number): void {

        const elapsed = timestamp - this.lastUpdateTime;

        if (elapsed > this.frameInterval) {
            // Calculate deltaTime
            this.deltaTime = (timestamp - this.lastUpdateTime) / 1000; // Convert to seconds
            this.lastUpdateTime = timestamp;

            // Update game state
            this.update(this.deltaTime);

            // Clear canvas
            this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

            // Render game
            this.render();
        }

        // Request next frame
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start(): void {
        // Start the game loop
        this.lastUpdateTime = performance.now();
        if (this.ctx === null) {
            console.error(`%c *** Error, 2dContext is null`, `background:#222; color: #FF0a55`)
            return;
        }
        console.log(`%c *** GAMELOOP START`, `background:#020; color:#adad00`)
        this.gameLoop(this.lastUpdateTime);
    }
}