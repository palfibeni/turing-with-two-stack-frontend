import {Entity} from "./Entity";

export class TuringRule extends Entity {

    fromState: number;

    readCharacter: String;

    toState: number;

    writeCharacter: String;

    direction: String;

    public toString(): string {
        return this.id.toString();
    }
}
