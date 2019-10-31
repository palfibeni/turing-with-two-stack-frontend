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
        let startStates = _.filter(states, (state: MachineState) => state.accept);
        if (startStates.size === 0) {
            throw `There is no start state!`;
        }
        if (startStates.size > 1) {
            let statesJoined = _.map(Array.from(startStates), (state: MachineState) => MachineState.toString(state)).join(", ");
            throw `More than one start state!  \n(${statesJoined})`;
        }

        // State duplicate by name validation
        let duplicateStatesByName = this.findDuplicateStatesByName(states);
        if (duplicateStatesByName.size) {
            let statesJoined = _.map(Array.from(duplicateStatesByName), (state: MachineState) => MachineState.toString(state)).join('\n, ');
            throw `Found duplicate named States! \n(${statesJoined})`;
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
    }

    private findDuplicateStatesByName(states: Array<MachineState>): Set<MachineState> {
        let predicateGenerator = (state: MachineState) => {
            return {name: state.name};
        };
        return this.findDuplicates(states, predicateGenerator);
    }

}
