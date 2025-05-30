import { Actor, Vector, Color} from "excalibur";
import { Resources } from "./resources";


export class Fish extends Actor {

    #sprite 
    isHooked = false;
    #hookTimeout = null;
    isShadow = true;

    constructor(gameWidth, gameHeight){
        super({
            width: Resources.FishShadow.width, height: Resources.FishShadow.height 
        })

        this.#sprite = Resources.FishShadow.toSprite()
        this.graphics.use(this.#sprite)
        const randomY = Math.random() * (gameHeight - Resources.FishShadow.height);
        const spawnLeft = Math.random() < 0.5;
        const speed = 80 + Math.random() * 120;
        if (spawnLeft) {
            this.pos = new Vector(0, randomY);
            this.vel = new Vector(speed, 0);
            this.graphics.flipHorizontal = true;
        } else {
            
            this.pos = new Vector(gameWidth - Resources.FishShadow.width, randomY);
            this.vel = new Vector(-100, 0);
            this.graphics.flipHorizontal = false;
        }
    }
    hook(onMiss) {
        if (this.isHooked) {
            return;
        }
        this.isHooked = true;
        this.vel = Vector.Zero;
        this.graphics.opacity = 0.5;
        this.#hookTimeout = setTimeout(() => {
            if (this.isHooked) {
                this.isHooked = false;
                this.graphics.opacity = 1;
                this.kill();
               if (onMiss) onMiss();
            }
        }, 1000);
    }

    catch() {
        if (this.isHooked && this.isShadow) {
            this.isHooked = false;
            this.isShadow = false;
            this.graphics.opacity = 1;
            if (this.#hookTimeout) {
                clearTimeout(this.#hookTimeout);
            }
            this.graphics.use(Resources.Fish.toSprite());
            this.graphics.opacity = 1;
            const fadeDuration = 500;
            const startTime = Date.now();
            const fade = () => {
                const elapsed = Date.now() - startTime;
                this.graphics.opacity = 1 - (elapsed / fadeDuration);
                if (elapsed < fadeDuration) {
                    requestAnimationFrame(fade);
                } else {
                    this.hit();
                }
            };
            fade();
        }
    }

    hit() {
     this.kill();
    }

    onPreUpdate(engine) {
        if (
            this.pos.x < -this.width ||
            this.pos.x > engine.drawWidth + this.width ||
            this.pos.y < -this.height ||
            this.pos.y > engine.drawHeight + this.height
        ) {
            this.kill();
        }
    }
}