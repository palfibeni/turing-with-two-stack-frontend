import {Injectable} from '@angular/core';
import {_} from 'underscore';

import {MachineState} from "../dto/MachineState";
import {Validator} from "./validator";

@Injectable({
    providedIn: 'root'
})
export class MachineStateValidator extends Validator {

    constructor() {
        super();
    }

    public validateMachineStates(states: Array<MachineState>): void {
        // Start state validation
        for (let state of states) {
            this.validateState(state);
        }

        let startStates = _.filter(states, (state: MachineState) => state.start);
        if (startStates.length === 0) {
            throw `There is no start state!`;
        }
        if (startStates.length > 1) {
            let statesJoined = this.joinStates(startStates);
            throw `More than one start state!  \n(${statesJoined})`;
        }

        // State duplicate by ID validation
        let stateIds = _.chain(states)
            .filter(state => !_.isUndefined(state.id) && !_.isNull(state.id))
            .map((state: MachineState) => state.id)
            .value();
        let duplicateStatesById = this.findDuplicates(stateIds);
        if (duplicateStatesById.size) {
            let idsJoined = Array.from(duplicateStatesById).join(", ");
            throw `Found duplicate state ids! \n(${idsJoined})`;
        }

        // State duplicate by name validation
        let duplicateStatesByName = this.findDuplicateStatesByName(states);
        if (duplicateStatesByName.size) {
            let statesJoined = this.joinStates(duplicateStatesByName);
            throw `Found duplicate named States! \n(${statesJoined})`;
        }
    }

    private validateState(state: MachineState): void {
        if (!state.name || !state.name.length || !state.name.trim()) {
            throw `Name field cannot be empty!`;
        }
        if (state.name === 'READ_INPUT_TO_LEFT') {
            throw `"READ_INPUT_TO_LEFT" is a reserved state name!`;
        }
        if (state.name === 'COPY_INPUT_TO_RIGHT') {
            throw `"COPY_INPUT_TO_RIGHT" is a reserved state name!`;
        }
    }

    private joinStates(duplicateStatesByName) {
        return _.map(Array.from(duplicateStatesByName), (state: MachineState) => state.toString()).join('\n, ');
    }

    private findDuplicateStatesByName(states: Array<MachineState>): Set<MachineState> {
        let predicateGenerator = (state: MachineState) => {
            return {name: state.name};
        };
        return this.findDuplicates(states, predicateGenerator);
    }

}
