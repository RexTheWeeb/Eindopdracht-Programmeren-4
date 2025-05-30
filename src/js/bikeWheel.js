import { Actor, Vector, Color } from "excalibur";
import { Resources } from "./resources";
import { Fish } from "./fish";

export class BikeWheel extends Fish {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight);
        this.isShadow = true;
        this.graphics.use(Resources.BikeWheelShadow.toSprite());
    }

    catch() {
        if (this.isHooked && this.isShadow) {
            this.isHooked = false;
            this.isShadow = false;
            this.graphics.opacity = 1;
            if (this.hookTimeout) {
                clearTimeout(this.hookTimeout);
            }
            this.graphics.use(Resources.BikeWheel.toSprite());
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

    getPoints() {
        return -3;
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