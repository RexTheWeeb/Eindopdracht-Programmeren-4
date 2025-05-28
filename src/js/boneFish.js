import { Actor, Vector, Color } from "excalibur";
import { Resources } from "./resources";
import { Fish } from "./fish";

export class BoneFish extends Fish {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight);
        this.isBubble = true;
    }

    catch(){
        if (this.isHooked && this.isBubble) {
            this.isHooked = false;
            this.isBubble = false;
            this.graphics.opacity = 1;
            if (this.hookTimeout) {
                clearTimeout(this.hookTimeout);
            }
            this.graphics.use(Resources.BoneFish.toSprite());
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
        return 3;
    }
}