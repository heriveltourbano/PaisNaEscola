import { BaseEntity, User } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public ativo?: boolean,
        public celular?: string,
        public nascimento?: any,
        public user?: User,
    ) {
        this.ativo = false;
    }
}
