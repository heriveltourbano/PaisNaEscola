import { BaseEntity } from './../../shared';

export class Responsavel implements BaseEntity {
    constructor(
        public id?: number,
        public usuario?: BaseEntity,
        public alunos?: BaseEntity[],
    ) {
    }
}
