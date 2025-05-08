import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader, randomIndex } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        // fish.events.on("exitviewport", (e) => this.fishLeft(e))
   
        for (let index = 0; index <= 99; index++) {
            const fish = new Actor()
            
            fish.graphics.use(Resources.Doro.toSprite())
            fish.pos = new Vector(Math.random() * 1280, Math.random() * 720)
            fish.vel = new Vector(Math.random() * 200 - 100, Math.random() * 200 - 100)
            this.add(fish);
            fish.events.on("exitviewport", (e) => this.fishLeft(e));
        }
    }

    fishLeft(e) {
        e.target.pos = new Vector(Math.random() * 1280, Math.random() * 720)
    }
}

new Game()
