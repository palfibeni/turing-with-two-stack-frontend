import {Injectable} from '@angular/core';
import {_} from 'underscore';

import {TuringMachine} from "../dto/TuringMachine";
import {MachineState} from "../dto/MachineState";
import {TuringRule} from "../dto/TuringRule";
import {Validator} from "./validator";
import {MachineStateValidator} from "./machine-state.validator";

@Injectable({
    providedIn: 'root'
})
export class TuringMachineValidator extends Validator {

    constructor(private machineStateValidator: MachineStateValidator) {
        super();
    }

    public validateTuringMachine(turingMachine: TuringMachine): void {
        // Characters duplicate validation
        let duplicateTapeCharacters = this.findDuplicates(turingMachine.tapeCharacters);
        if (duplicateTapeCharacters.size) {
            let charsJoined = Array.from(duplicateTapeCharacters).join(", ");
            throw `Found duplicate tape characters! (${charsJoined})`;
        }

        // Validate Machine States
        this.machineStateValidator.validateMachineStates(turingMachine.states);

        // Rule duplicate by ID validation
        let ruleIds = _.chain(turingMachine.rules)
            .filter((rule: TuringRule) => !_.isUndefined(rule.id) && !_.isNull(rule.id))
            .map((rule: TuringRule) => rule.id)
            .value();
        let duplicateRulesById = this.findDuplicates(ruleIds);
        if (duplicateRulesById.size) {
            let idsJoined = Array.from(duplicateRulesById).join(", ");
            throw `Found duplicate rule ids! \n(${idsJoined})`;
        }

        // Rules unknown Character validation
        let rulesWithUnknownChars: Array<TuringRule> = turingMachine.rules.filter(
            (rule: TuringRule) => rule.readCharacter != '_' && rule.writeCharacter != '_'
                && (!_.contains(turingMachine.tapeCharacters, rule.readCharacter)
                    || !_.contains(turingMachine.tapeCharacters, rule.writeCharacter))
        );
        if (rulesWithUnknownChars.length) {
            let rulesJoined = _.map(rulesWithUnknownChars, (rule: TuringRule) => TuringRule.toString(rule)).join('\n, ');
            throw `Unknown characters found in rules! \n(${rulesJoined})`;
        }

        // Rules unknown State validation
        let stateIds = _.chain(turingMachine.states)
            .filter(state => !_.isUndefined(state.id) && !_.isNull(state.id))
            .map((state: MachineState) => state.id)
            .value();
        let rulesWithUnknownState: Array<TuringRule> = turingMachine.rules.filter(
            (rule: TuringRule) => !_.contains(stateIds, rule.fromState.id)
                || !_.contains(stateIds, rule.toState.id)
        );
        if (rulesWithUnknownState.length) {
            let rulesJoined = rulesWithUnknownState.map((rule: TuringRule) => TuringRule.toString(rule)).join('\n, ');
            throw `Unknown States found in rules! \n(${rulesJoined})`;
        }
    }

}
