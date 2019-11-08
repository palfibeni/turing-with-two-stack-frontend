import {Injectable} from '@angular/core';
import {_} from 'underscore';

import {TuringRule} from "../dto/TuringRule";
import {MachineState} from "../dto/MachineState";
import {Validator} from "./validator";

@Injectable({
    providedIn: 'root'
})
export class TuringRuleValidator extends Validator {

    constructor() {
        super();
    }

    public validateTuringRules(tapeCharacters: Array<String>, states: Array<MachineState>, rules: Array<TuringRule>): void {

        for (let rule of rules) {
            this.validateRule(rule);
            console.log(rule.toString());
        }

        // Rule duplicate by ID validation
        let ruleIds = _.chain(rules)
            .filter((rule: TuringRule) => !_.isUndefined(rule.id) && !_.isNull(rule.id))
            .map((rule: TuringRule) => rule.id)
            .value();
        let duplicateRulesById = this.findDuplicates(ruleIds);
        if (duplicateRulesById.size) {
            let idsJoined = Array.from(duplicateRulesById).join(", ");
            throw `Found duplicate rule ids! \n(${idsJoined})`;
        }

        // Rules unknown Character validation
        let rulesWithUnknownChars: Array<TuringRule> = rules.filter(
            (rule: TuringRule) => rule.readCharacter != '_' && rule.writeCharacter != '_'
                && (!_.contains(tapeCharacters, rule.readCharacter)
                    || !_.contains(tapeCharacters, rule.writeCharacter))
        );
        if (rulesWithUnknownChars.length) {
            let rulesJoined = _.chain(rulesWithUnknownChars).map((rule: TuringRule) => rule.toString()).join('\n, ');
            throw `Unknown characters found in rules! \n(${rulesJoined})`;
        }

        // Rules unknown State validation
        let stateIds = _.chain(states)
            .filter(state => !_.isUndefined(state.id) && !_.isNull(state.id))
            .map((state: MachineState) => state.id)
            .value();
        let rulesWithUnknownState: Array<TuringRule> = rules.filter(
            (rule: TuringRule) => !_.contains(stateIds, rule.fromState.id)
                || !_.contains(stateIds, rule.toState.id)
        );
        if (rulesWithUnknownState.length) {
            let rulesJoined = _.chain(rulesWithUnknownState).map((rule: TuringRule) => rule.toString()).join('\n, ');
            throw `Unknown States found in rules! \n(${rulesJoined})`;
        }
    }

    private validateRule(rule: TuringRule): void {
        if (!rule.toState) {
            throw `On rules to state field cannot be empty!`;
        }
        if (!rule.readCharacter) {
            throw `On rules read character field cannot be empty!`;
        }
        if (!rule.fromState) {
            throw `On rules from state field cannot be empty!`;
        }
        if (!rule.toState) {
            throw `On rules write character field cannot be empty!`;
        }
        if (!rule.direction) {
            throw `On rules direction field cannot be empty!`;
        }
    }
}
