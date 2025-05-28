import { Actor, Color, Font, Label, Vector } from "excalibur";


export class UI extends Actor {

    label 

    constructor(x = 100, y = 50, labelText) {
        super();
        this.x = x;
        this.y = y;
        this.labelText = labelText;
    }

    onInitialize(engine) {
        this.label = new Label({
            text: this.labelText,
            pos: new Vector(this.x, this.y),
            font: new Font({
                size: 20,
                family: 'Comic Sans',
                color: Color.White
            })
        })
        this.addChild(this.label);
    }

    updateScore(score) {
        this.label.text = `${this.labelText}: ${score}`;
    }
}