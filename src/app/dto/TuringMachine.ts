import {TuringRule} from './TuringRule';
import {MachineState} from "./MachineState";

export class TuringMachine{
    id: number;

    name: string;

    tapeCharacters: Array<string>;

    states: Array<MachineState>;

    rules: Array<TuringRule>;

    constructor() {
        this.tapeCharacters = new Array<string>();
        this.states = new Array<MachineState>();
        this.rules = new Array<TuringRule>();
    }
}
