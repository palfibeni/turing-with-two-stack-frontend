import {Entity} from "./Entity";

export class MachineState extends Entity {

    name: String;

    start: boolean;

    accept: boolean;

    decline: boolean;

    public equals(other: MachineState): boolean {
        return this.id === other.id || this.name === other.name;
    }

    public toString(): string {
        return this.id + ' ' + this.name;
    }
}
