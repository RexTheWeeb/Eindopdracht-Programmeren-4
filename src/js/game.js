import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader, randomIndex } from './resources.js';
import { Fish } from './fish.js';

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
        const fish = new Fish();
        this.add(fish);
    }

    
}

new Game()
