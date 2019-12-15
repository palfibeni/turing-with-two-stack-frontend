import {Injectable} from '@angular/core';
import {_} from 'underscore';

import {TuringMachine} from "../dto/TuringMachine";
import {Validator} from "./validator";
import {MachineStateValidator} from "./machine-state.validator";
import {TuringRuleValidator} from "./turing-rule.validator";

@Injectable({
    providedIn: 'root'
})
export class TuringMachineValidator extends Validator {

    constructor(private machineStateValidator: MachineStateValidator, private turingRuleValidator: TuringRuleValidator) {
        super();
    }

    private validateNewCharacter(character: String, tapeCharacters: Array<String>) {
        this.validateCharacters(_.union(tapeCharacters, [character]));
    }

    public validateCharacters(tapeCharacters: Array<String>) {
        if (!tapeCharacters || !tapeCharacters.length) {
            throw `Tape characters cannot be empty!`;
        }

        // Characters duplicate validation
        let duplicateTapeCharacters = this.findDuplicates(tapeCharacters);
        if (duplicateTapeCharacters.size) {
            let charsJoined = Array.from(duplicateTapeCharacters).join(", ");
            throw `Found duplicate tape characters! (${charsJoined})`;
        }

        for (let character of tapeCharacters) {
            this.validateCharacter(character);
        }
    }

    public validateCharacter(character: String) {
        if (!character || !character.length || !character.trim()) {
            throw `Empty Character is not allowed!`;
        }
        if (character.length > 1) {
            throw `Character is too long! ${character}`;
        }
        if (character === '_' || character === '#' || character === '*') {
            throw `Reserved character is not allowed! ('_', '#', '*')`;
        }
    }

    public validateTuringMachine(turingMachine: TuringMachine): void {
        if (!turingMachine.name || !turingMachine.name.length || !turingMachine.name.trim()) {
            throw `Turing Machine!s name field cannot be empty!`;
        }

        // Characters duplicate validation
        this.validateCharacters(turingMachine.tapeCharacters);

        // Validate machine states
        this.machineStateValidator.validateMachineStates(turingMachine.states);

        // Validate turing rules
        this.turingRuleValidator.validateTuringRules(turingMachine.tapeCharacters, turingMachine.states, turingMachine.rules);
    }

}
