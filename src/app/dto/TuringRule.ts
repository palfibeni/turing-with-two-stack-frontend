import {Entity} from "./Entity";
import {MachineState} from "./MachineState";

export class TuringRule extends Entity {

    fromState: MachineState;

    readCharacter: String;

    toState: MachineState;

    writeCharacter: String;

    direction: String;

    public static toString(rule: TuringRule): string {
        return 'id: ' +  rule.id
            + ', readCharacter: ' + rule.readCharacter +  ', fromState: ' + rule.fromState
            + ', writeCharacter: ' + rule.writeCharacter +  ', toState: ' + rule.toState;
    }
}
