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
            .filter(state => !_.isUndefined(state.id))
            .map((state: MachineState) => state.id)
            .value();
        let rulesWithUnknownState: Array<TuringRule> = rules.filter(
            (rule: TuringRule) => !_.contains(stateIds, rule.fromState.id)
                || !_.contains(stateIds, rule.toState.id)
        );
        if (rulesWithUnknownState.length) {
            let rulesJoined = _.chain(rulesWithUnknownState).map((rule: TuringRule) => rule.toString()).join('\n, ');
            throw `Unknown States (By ID) found in rules! \n(${rulesJoined})`;
        }
        // Rules unknown State validation
        let stateNames = _.chain(states)
            .filter(state => !_.isUndefined(state.id))
            .map((state: MachineState) => state.id)
            .value();
        let rulesWithUnknownStateName: Array<TuringRule> = rules.filter(
            (rule: TuringRule) => !_.contains(stateNames, rule.fromState.name)
                || !_.contains(stateNames, rule.toState.name)
        );
        if (rulesWithUnknownStateName.length) {
            let rulesJoined = _.chain(rulesWithUnknownStateName).map((rule: TuringRule) => rule.toString()).join('\n, ');
            throw `Unknown States (By name) found in rules! \n(${rulesJoined})`;
        }
    }

    private validateRule(rule: TuringRule): void {
        if (!rule.toState) {
            throw `Rule's toState field cannot be empty!`;
        }
        if (!rule.readCharacter || !rule.readCharacter.length || !rule.readCharacter.trim()) {
            throw `Rule's readCharacter field cannot be empty!`;
        }
        if (!rule.fromState) {
            throw `Rule's fromState field cannot be empty!`;
        }
        if (!rule.writeCharacter || !rule.writeCharacter.length || !rule.writeCharacter.trim()) {
            throw `Rule's writeCharacter field cannot be empty!`;
        }
        if (!rule.direction) {
            throw `Rule's direction field cannot be empty!`;
        }
    }
}
