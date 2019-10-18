import {Entity} from "./Entity";

export class TuringRule extends Entity {

    fromState: number;

    readCharacter: String;

    toState: number;

    writeCharacter: String;

    direction: String;

    public static toString(rule: TuringRule): string {
        return 'id: ' +  rule.id
            + ', readCharacter: ' + rule.readCharacter +  ', fromState: ' + rule.fromState
            + ', writeCharacter: ' + rule.writeCharacter +  ', toState: ' + rule.toState;
    }
}
