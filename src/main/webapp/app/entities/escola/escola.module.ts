import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    EscolaService,
    EscolaPopupService,
    EscolaComponent,
    EscolaDetailComponent,
    EscolaDialogComponent,
    EscolaPopupComponent,
    EscolaDeletePopupComponent,
    EscolaDeleteDialogComponent,
    escolaRoute,
    escolaPopupRoute,
    EscolaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...escolaRoute,
    ...escolaPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EscolaComponent,
        EscolaDetailComponent,
        EscolaDialogComponent,
        EscolaDeleteDialogComponent,
        EscolaPopupComponent,
        EscolaDeletePopupComponent,
    ],
    entryComponents: [
        EscolaComponent,
        EscolaDialogComponent,
        EscolaPopupComponent,
        EscolaDeleteDialogComponent,
        EscolaDeletePopupComponent,
    ],
    providers: [
        EscolaService,
        EscolaPopupService,
        EscolaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaEscolaModule {}
