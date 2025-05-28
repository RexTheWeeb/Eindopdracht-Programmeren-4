import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { FishingRod } from './fishingRod.js';
import { Fish } from './fish.js';
import { UI } from './ui.js';
import { BoneFish } from './boneFish.js';

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            pixelRatio: 1
         })
         this.fishingRod = null
        this.score = 0;
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.ui = new UI(100, 50, "Score");
        this.add(this.ui);
        
        this.input.pointers.primary.on('down', (evt) => {
            const pos = evt.worldPos;
            if (!this.fishingRod) {
                this.fishingRod = new FishingRod(pos, this);
                this.add(this.fishingRod);
                this.fishingRod.on('kill', () => {
                    this.fishingRod = null;
                });
            }
        });

       
        for (let i = 0; i < 14; i++) {
            let fish;
            if (Math.random() < 0.2) {
                fish = new BoneFish(this.drawWidth, this.drawHeight);
            } else {
                fish = new Fish(this.drawWidth, this.drawHeight);
            }
            this.add(fish);
        }
    }

    addScore(points = 1) {
        this.score += points;
        this.ui.updateScore(this.score);
    }

    
}

new Game()

// if (event.other.owner)