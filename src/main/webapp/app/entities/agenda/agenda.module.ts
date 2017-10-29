import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    AgendaService,
    AgendaPopupService,
    AgendaComponent,
    AgendaDetailComponent,
    AgendaDialogComponent,
    AgendaPopupComponent,
    AgendaDeletePopupComponent,
    AgendaDeleteDialogComponent,
    agendaRoute,
    agendaPopupRoute,
    AgendaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...agendaRoute,
    ...agendaPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AgendaComponent,
        AgendaDetailComponent,
        AgendaDialogComponent,
        AgendaDeleteDialogComponent,
        AgendaPopupComponent,
        AgendaDeletePopupComponent,
    ],
    entryComponents: [
        AgendaComponent,
        AgendaDialogComponent,
        AgendaPopupComponent,
        AgendaDeleteDialogComponent,
        AgendaDeletePopupComponent,
    ],
    providers: [
        AgendaService,
        AgendaPopupService,
        AgendaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaAgendaModule {}
