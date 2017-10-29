import { BaseEntity } from './../../shared';

export class Professor implements BaseEntity {
    constructor(
        public id?: number,
        public usuario?: BaseEntity,
        public classes?: BaseEntity[],
    ) {
    }
}
