import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PaisNaEscolaUsuarioModule } from './usuario/usuario.module';
import { PaisNaEscolaProfessorModule } from './professor/professor.module';
import { PaisNaEscolaAlunoModule } from './aluno/aluno.module';
import { PaisNaEscolaResponsavelModule } from './responsavel/responsavel.module';
import { PaisNaEscolaSecretariaModule } from './secretaria/secretaria.module';
import { PaisNaEscolaEscolaModule } from './escola/escola.module';
import { PaisNaEscolaClasseModule } from './classe/classe.module';
import { PaisNaEscolaAgendaModule } from './agenda/agenda.module';
import { PaisNaEscolaMensagemModule } from './mensagem/mensagem.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PaisNaEscolaUsuarioModule,
        PaisNaEscolaProfessorModule,
        PaisNaEscolaAlunoModule,
        PaisNaEscolaResponsavelModule,
        PaisNaEscolaSecretariaModule,
        PaisNaEscolaEscolaModule,
        PaisNaEscolaClasseModule,
        PaisNaEscolaAgendaModule,
        PaisNaEscolaMensagemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaEntityModule {}
