import {Figure, FigureNames} from "./Figure"
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
    private _hadAlreadyMoved: boolean;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
        this._hadAlreadyMoved = false;
    }

    get hadAlreadyMoved(): boolean {
        return this._hadAlreadyMoved;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;

        if (!this._hadAlreadyMoved && target.x === 6 && target.y === this.cell.y) {
            return true;
        }
        if (!this._hadAlreadyMoved && target.x === 2 && target.y === this.cell.y) {
            return true;
        }

        if (Math.abs(target.x - this.cell.x) <= 1
            && Math.abs(target.y - this.cell.y) <= 1)
            return true;

        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this._hadAlreadyMoved = true;
    }
}