import {TuringRule} from './TuringRule';
import {MachineState} from "./MachineState";
import {Entity} from "./Entity";

export class TuringMachine extends Entity {

    name: String;

    description: String;

    tapeCharacters: Array<String>;

    states: Array<MachineState>;

    rules: Array<TuringRule>;

    constructor(id?: number, name?: String, description?: String, tapeCharacters?: Array<String>, states?: Array<MachineState>, rules?: Array<TuringRule>) {
        super(id);
        this.name = name ? name : "";
        this.description = description ? description : "";
        this.tapeCharacters = tapeCharacters ? tapeCharacters : new Array<String>();
        this.states = states ? states : new Array<MachineState>();
        this.rules = rules ? rules : new Array<TuringRule>();
    }

    public static toString(turingMachine: TuringMachine): string {
        return 'id: ' + turingMachine.id + ' ' + turingMachine.name;
    }
}
