import { Actor, Vector, Color} from "excalibur";
import { Resources } from "./resources";


export class Fish extends Actor {

    sprite 
    isHooked = false;
    hookTimeout = null;
    isBubble = true;

    constructor(gameWidth, gameHeight){
        super({
            width: Resources.Bubble.width, height: Resources.Bubble.height 
        })

        this.sprite = Resources.Bubble.toSprite()
        this.graphics.use(this.sprite)
        const randomY = Math.random() * (gameHeight - Resources.Bubble.height);
        const spawnLeft = Math.random() < 0.5;
        if (spawnLeft) {
            this.pos = new Vector(0, randomY);
            this.vel = new Vector(100, 0);
            this.graphics.flipHorizontal = true;
        } else {
            
            this.pos = new Vector(gameWidth - Resources.Bubble.width, randomY);
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
        this.hookTimeout = setTimeout(() => {
            if (this.isHooked) {
                this.isHooked = false;
                this.graphics.opacity = 1;
               if (onMiss) onMiss();
            }
        }, 3000);
    }

    catch() {
        if (this.isHooked && this.isBubble) {
            this.isHooked = false;
            this.isBubble = false;
            this.graphics.opacity = 1;
            if (this.hookTimeout) {
                clearTimeout(this.hookTimeout);
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
}