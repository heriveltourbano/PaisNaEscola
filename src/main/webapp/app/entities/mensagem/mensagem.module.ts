import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    MensagemService,
    MensagemPopupService,
    MensagemComponent,
    MensagemDetailComponent,
    MensagemDialogComponent,
    MensagemPopupComponent,
    MensagemDeletePopupComponent,
    MensagemDeleteDialogComponent,
    mensagemRoute,
    mensagemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mensagemRoute,
    ...mensagemPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MensagemComponent,
        MensagemDetailComponent,
        MensagemDialogComponent,
        MensagemDeleteDialogComponent,
        MensagemPopupComponent,
        MensagemDeletePopupComponent,
    ],
    entryComponents: [
        MensagemComponent,
        MensagemDialogComponent,
        MensagemPopupComponent,
        MensagemDeleteDialogComponent,
        MensagemDeletePopupComponent,
    ],
    providers: [
        MensagemService,
        MensagemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaMensagemModule {}
