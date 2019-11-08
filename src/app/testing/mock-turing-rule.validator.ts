import {Injectable} from "@angular/core";
import {MachineState} from "../dto/MachineState";
import {TuringRule} from "../dto/TuringRule";

@Injectable()
export class MockTuringRuleValidator {
    public validateTuringRules(tapeCharacters: Array<String>,
                               states: Array<MachineState>,
                               rules: Array<TuringRule>): void {

    }
}
