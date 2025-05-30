import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode, Color } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { FishingRod } from './fishingRod.js';
import { Fish } from './fish.js';
import { UI } from './ui.js';
import { ClownFish } from './clownFish.js';
import { LionFish } from './lionFish.js';
import { BikeWheel } from './bikeWheel.js';

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            pixelRatio: 1
         })
        this.backgroundColor = Color.fromHex('#0a2342')
        this.fishingRod = null;
        this.score = 0;
        this.highScore = Number(localStorage.getItem('highScore')) || 0;
        this.on('postupdate', () => this.onPostUpdate());
        this.start(ResourceLoader).then(() => this.startGame());
    }


    spawnFishes() {
        for (let i = 0; i < 14; i++) {
            let fish;
            const rand = Math.random();
            if (rand < 0.1) {
                fish = new LionFish(this.drawWidth, this.drawHeight);
            } else if (rand < 0.2) {
                fish = new BikeWheel(this.drawWidth, this.drawHeight);
            } else if (rand < 0.4) {
                fish = new ClownFish(this.drawWidth, this.drawHeight);
            } else {
                fish = new Fish(this.drawWidth, this.drawHeight);
            }
            this.add(fish);
        }
    }

    startGame() {
        this.ui = new UI(100, 50, "Score", this.highscore);
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
        this.spawnFishes();
    }

    addScore(points = 1) {
        this.score += points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        this.ui.updateScore(this.score, this.highScore);
    }

    onPostUpdate() {
        const fishLeft = this.currentScene.actors.some(actor =>
            actor instanceof Fish || actor instanceof ClownFish || actor instanceof LionFish || actor instanceof BikeWheel
        );
        if (!fishLeft && this.ui && !document.getElementById('restart-btn')) {
            this.ui.showRestartButton(() => this.resetGame());
        }
    }

    resetGame() {
        this.ui.hideRestartButton();
        if (this.fishingRod) {
            this.fishingRod.kill();
            this.fishingRod = null;
        }
        this.currentScene.actors.forEach(actor => {
            if (!(actor instanceof UI) && !(actor instanceof FishingRod)) {
                actor.kill();
            }
        });
        this.score = 0;
        this.ui.updateScore(this.score, this.highScore);
        this.ui = new UI(100, 50, "Score", this.highScore);
        this.add(this.ui);
        this.spawnFishes();
    }

}

new Game()

// if (event.other.owner)