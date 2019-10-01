import {TuringRule} from './TuringRule';
import {MachineState} from "./MachineState";

export class TuringMachine{
    id: number;

    name: String;

    tapeCharacters: Array<String>;

    states: Array<MachineState>;

    rules: Array<TuringRule>;

    constructor() {
        this.tapeCharacters = new Array<String>();
        this.states = new Array<MachineState>();
        this.rules = new Array<TuringRule>();
    }
}
