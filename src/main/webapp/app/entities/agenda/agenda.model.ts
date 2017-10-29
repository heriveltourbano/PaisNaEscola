import { BaseEntity } from './../../shared';

export class Agenda implements BaseEntity {
    constructor(
        public id?: number,
        public inicio?: any,
        public termino?: any,
        public descricao?: string,
        public classe?: BaseEntity,
    ) {
    }
}
