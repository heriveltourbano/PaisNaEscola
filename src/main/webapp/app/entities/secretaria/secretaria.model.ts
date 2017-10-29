import { BaseEntity } from './../../shared';

export class Secretaria implements BaseEntity {
    constructor(
        public id?: number,
        public usuario?: BaseEntity,
        public escola?: BaseEntity,
    ) {
    }
}
