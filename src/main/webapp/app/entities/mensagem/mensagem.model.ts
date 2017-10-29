import { BaseEntity } from './../../shared';

const enum SituacaoMsg {
    'CRIADA',
    'ENVIADA',
    'RECEBIDA',
    'LIDA'
}

export class Mensagem implements BaseEntity {
    constructor(
        public id?: number,
        public mensagem?: string,
        public situacao?: SituacaoMsg,
        public criada?: any,
        public enviada?: any,
        public recebida?: any,
        public lida?: any,
        public remetente?: BaseEntity,
        public destinatario?: BaseEntity,
    ) {
    }
}
