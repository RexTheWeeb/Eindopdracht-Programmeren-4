import { Actor, Color, Font, Label, Vector } from "excalibur";


export class UI extends Actor {

    label 
    highScoreLabel

    constructor(x = 100, y = 50, labelText, highScore = 0) {
        super();
        this.x = x;
        this.y = y;
        this.labelText = labelText;
        this.highScore = highScore;
    }


    onInitialize(engine) {
        this.label = new Label({
            text: `${this.labelText}: ${this.score ?? 0}`,
            pos: new Vector(this.x, this.y),
            font: new Font({
                size: 20,
                family: 'Comic Sans',
                color: Color.White
            })
        });
        this.addChild(this.label);

        this.highScoreLabel = new Label({
            text: `High Score: ${this.highScore ?? 0}`,
            pos: new Vector(this.x, this.y + 30),
            font: new Font({
                size: 20,
                family: 'Comic Sans',
                color: Color.White
            })
        });
        this.addChild(this.highScoreLabel);
    }

    showRestartButton(onRestart) {
        if (this.restartBtn) return; 

        this.restartBtn = document.createElement('button');
        this.restartBtn.textContent = 'Restart';
        this.restartBtn.style.position = 'absolute';
        this.restartBtn.style.left = '50%';
        this.restartBtn.style.top = '50%';
        this.restartBtn.style.transform = 'translate(-50%, -50%)';
        this.restartBtn.style.fontSize = '2rem';
        this.restartBtn.style.padding = '1rem 2rem';
        this.restartBtn.id = 'restart-btn';

        this.restartBtn.onclick = () => {
            this.hideRestartButton();
            if (onRestart) onRestart();
        };

        document.body.appendChild(this.restartBtn);
    }

    hideRestartButton() {
        if (this.restartBtn) {
            this.restartBtn.remove();
            this.restartBtn = null;
        }
    }

    updateScore(score, highScore) {
        this.label.text = `${this.labelText}: ${score}`;
        if (typeof highScore !== "undefined") {
            this.highScoreLabel.text = `High Score: ${highScore}`;
        }
    }
}