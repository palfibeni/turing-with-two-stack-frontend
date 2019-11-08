import {Entity} from "./Entity";
import {MachineState} from "./MachineState";

export class TuringRule extends Entity {

    fromState: MachineState;

    readCharacter: String;

    toState: MachineState;

    writeCharacter: String;

    direction: String;

    public static toString(rule: TuringRule): string {
        return 'id: ' + rule.id
            + ', readCharacter: ' + rule.readCharacter + ', fromState: ' + rule.fromState
            + ', writeCharacter: ' + rule.writeCharacter + ', toState: ' + rule.toState;
    }

    public toString = (): string => {
        return 'id: ' + this.id
            + ', readCharacter: ' + this.readCharacter + ', fromState: ' + this.fromState.toString()
            + ', writeCharacter: ' + this.writeCharacter + ', toState: ' + this.toState.toString();
    };

    public equals(other: TuringRule): boolean {
        if (this.id != null && other.id != null) {
            return this.id === other.id;
        }
        return this.fromState.equals(other.fromState)
            && this.readCharacter === other.readCharacter
            && this.toState.equals(other.toState)
            && this.writeCharacter === other.writeCharacter
            && this.direction === other.direction;
    }
}
