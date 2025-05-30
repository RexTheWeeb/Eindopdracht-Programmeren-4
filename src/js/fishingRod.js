import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Fish } from "./fish.js"


export class FishingRod extends Actor {
    #hookedFish = null;

    constructor(pos, game) {
        super({
            pos: pos,
            width: Resources.FishingRod.width, 
            height: Resources.FishingRod.height,
            
        })
        this.game = game;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.FishingRod.toSprite());
        this.on("collisionstart", (event) => this.handleCollision(event));

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Space && this.#hookedFish && this.#hookedFish.isHooked) {
                const points = typeof this.#hookedFish.getPoints === "function" ? this.#hookedFish.getPoints() : 1;
                this.#hookedFish.catch();
                this.game.addScore(points);
                this.#hookedFish = null;
                this.graphics.opacity = 1;
                this.kill();
            }
        });
        
    }

    onPreUpdate(engine) {

        if (this.#hookedFish) {
            this.vel = Vector.Zero;
            return;
        }
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Up)) {
             yspeed = -300;
        }

        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 300;
        }

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -300;
        }
        
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 300;
        }
        this.vel = new Vector(xspeed, yspeed);

        const minX = 0;
        const minY = 0;
        const maxX = engine.drawWidth - this.width;
        const maxY = engine.drawHeight - this.height;

        this.pos.x = Math.max(minX, Math.min(this.pos.x, maxX));
        this.pos.y = Math.max(minY, Math.min(this.pos.y, maxY));
    }

    handleCollision(event) {
        if (event.other.owner instanceof Fish) {
            const fish = event.other.owner;
            if (!fish.isHooked && !this.#hookedFish) {
                this.#hookedFish = fish;
                this.graphics.opacity = 0.5;
                fish.hook(() => {
                    this.#hookedFish = null;
                    this.graphics.opacity = 1;
                });
            }
        }
    }

}