export class Entity {
    id: number;

    constructor(id?: number) {
        this.id = id ? id : null;
    }

    public equals(other: Entity): boolean {
        return this.id === other.id;
    }
}
