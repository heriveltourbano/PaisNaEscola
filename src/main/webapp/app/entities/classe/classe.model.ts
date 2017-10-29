import { BaseEntity } from './../../shared';

export class Classe implements BaseEntity {
    constructor(
        public id?: number,
        public anoLetivo?: number,
        public descricao?: string,
        public agenda?: BaseEntity[],
        public professors?: BaseEntity[],
        public alunos?: BaseEntity[],
        public escola?: BaseEntity,
    ) {
    }
}
