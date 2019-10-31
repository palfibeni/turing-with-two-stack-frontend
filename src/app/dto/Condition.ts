import {MachineState} from "./MachineState";

export class Condition{
    currentState: MachineState;

    currentPosition: String;

    charactersAhead: Array<String>;

    charactersBehind: Array<String>;
}
