import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    SecretariaService,
    SecretariaPopupService,
    SecretariaComponent,
    SecretariaDetailComponent,
    SecretariaDialogComponent,
    SecretariaPopupComponent,
    SecretariaDeletePopupComponent,
    SecretariaDeleteDialogComponent,
    secretariaRoute,
    secretariaPopupRoute,
    SecretariaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...secretariaRoute,
    ...secretariaPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SecretariaComponent,
        SecretariaDetailComponent,
        SecretariaDialogComponent,
        SecretariaDeleteDialogComponent,
        SecretariaPopupComponent,
        SecretariaDeletePopupComponent,
    ],
    entryComponents: [
        SecretariaComponent,
        SecretariaDialogComponent,
        SecretariaPopupComponent,
        SecretariaDeleteDialogComponent,
        SecretariaDeletePopupComponent,
    ],
    providers: [
        SecretariaService,
        SecretariaPopupService,
        SecretariaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaSecretariaModule {}
