import {MachineState} from "../dto/MachineState";
import {Condition} from "../dto/Condition";

export class TestHelper {
    public static createCondition(currentState: MachineState, charactersBehind: Array<String>, currentPosition: String, charactersAhead: Array<String>): Condition {
        let condition = new Condition();
        condition.currentState = currentState;
        condition.charactersBehind = charactersBehind;
        condition.currentPosition = currentPosition;
        condition.charactersAhead = charactersAhead;
        return condition;
    }

    public static createMachineState(name: String, start: boolean, accept: boolean, decline: boolean): MachineState {
        let state = new MachineState();
        state.name = name;
        state.start = start;
        state.accept = accept;
        state.decline = decline;
        return state;
    }
}
