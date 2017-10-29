import { BaseEntity } from './../../shared';

export class Aluno implements BaseEntity {
    constructor(
        public id?: number,
        public usuario?: BaseEntity,
        public responsavels?: BaseEntity[],
        public classes?: BaseEntity[],
    ) {
    }
}
