import {TuringRule} from './TuringRule';

export class TuringMachine{
    tapeCharacters: Array<string>;

    states: Array<string>;

    startState: string;

    acceptStates: Array<string>;

    declineStates: Array<string>;

    rules: Array<TuringRule>;
}