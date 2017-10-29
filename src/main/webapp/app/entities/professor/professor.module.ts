import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    ProfessorService,
    ProfessorPopupService,
    ProfessorComponent,
    ProfessorDetailComponent,
    ProfessorDialogComponent,
    ProfessorPopupComponent,
    ProfessorDeletePopupComponent,
    ProfessorDeleteDialogComponent,
    professorRoute,
    professorPopupRoute,
    ProfessorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...professorRoute,
    ...professorPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfessorComponent,
        ProfessorDetailComponent,
        ProfessorDialogComponent,
        ProfessorDeleteDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorComponent,
        ProfessorDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeleteDialogComponent,
        ProfessorDeletePopupComponent,
    ],
    providers: [
        ProfessorService,
        ProfessorPopupService,
        ProfessorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaProfessorModule {}
