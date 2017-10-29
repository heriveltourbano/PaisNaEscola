import { BaseEntity } from './../../shared';

export class Escola implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public classes?: BaseEntity[],
        public secretarias?: BaseEntity[],
    ) {
    }
}
