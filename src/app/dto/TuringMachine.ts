import {TuringRule} from './TuringRule';
import {MachineState} from "./MachineState";
import {Entity} from "./Entity";

export class TuringMachine extends Entity {

    name: String;

    tapeCharacters: Array<String>;

    states: Array<MachineState>;

    rules: Array<TuringRule>;

    constructor() {
        super();
        this.tapeCharacters = new Array<String>();
        this.states = new Array<MachineState>();
        this.rules = new Array<TuringRule>();
    }

    public static toString(turingMachine: TuringMachine): string {
        return 'id: ' + turingMachine.id + ' ' + turingMachine.name;
    }
}
