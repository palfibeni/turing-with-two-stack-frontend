import {TuringRule} from './TuringRule';
import {MachineState} from "./MachineState";

export class TuringMachine{
    tapeCharacters: Array<string>;

    states: Array<MachineState>;

    rules: Array<TuringRule>;
}