import {Entity} from "./Entity";

export class MachineState extends Entity {

    name: String;

    start: boolean;

    accept: boolean;

    decline: boolean;

    constructor(id?: number) {
        super(id);
        this.start = false;
        this.accept = false;
        this.decline = false;
    }

    public equals(other: MachineState): boolean {
        return this.id === other.id || this.name === other.name;
    }

    public static toString(state: MachineState): string {
        return state.id + ' ' + state.name;
    }
}
