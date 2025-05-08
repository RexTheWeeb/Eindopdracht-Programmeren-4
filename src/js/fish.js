import {Actor, Vector } from "excalibur";
import {Resources} from "./resources";

export class Fish extends Actor {
    onInitialize() {
        this.graphics.use(Resources.Fish.toSprite())
        this.fishToRandomPosition(e)
        this.events.on("exitviewport", (e) => this.fishToRandomPosition(e));
    }

    fishToRandomPosition(e) {
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.vel = new Vector(Math.random() * 200 - 100, Math.random() * 200 - 100)
    }
}
