import { ROUNDS } from "./rules.js";
import Round from "./round.js";
import { BonusPool } from "./pool.js";
import * as score from "./score.js";
const dataset = document.body.dataset;
export default class Game {
    constructor(_type) {
        this._type = _type;
    }
    play(_board) {
        dataset.stage = "game";
    }
    _outro(_board) {
        dataset.stage = "outro";
    }
}
export class SingleGame extends Game {
    async play(board) {
        super.play(board);
        const maxRounds = ROUNDS[this._type];
        const parent = document.querySelector("#game");
        parent.innerHTML = "";
        const bonusPool = new BonusPool();
        parent.appendChild(bonusPool.node);
        let num = 1;
        while (num <= maxRounds) {
            let round = new Round(num, board, bonusPool);
            parent.appendChild(round.node);
            await round.start(this._type);
            round.end();
            round.node.remove();
            num++;
        }
        this._outro(board);
    }
    _outro(board) {
        super._outro(board);
        let s = board.getScore();
        board.showScore(s);
        const placeholder = document.querySelector("#outro div");
        placeholder.innerHTML = "";
        placeholder.appendChild(score.render(s));
    }
}
export class MultiGame extends Game {
}