export class Entity {
    id: number;

    public equals(other: Entity): boolean {
        return this.id === other.id;
    }
}
