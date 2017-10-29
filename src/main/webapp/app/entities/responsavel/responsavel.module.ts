import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaisNaEscolaSharedModule } from '../../shared';
import {
    ResponsavelService,
    ResponsavelPopupService,
    ResponsavelComponent,
    ResponsavelDetailComponent,
    ResponsavelDialogComponent,
    ResponsavelPopupComponent,
    ResponsavelDeletePopupComponent,
    ResponsavelDeleteDialogComponent,
    responsavelRoute,
    responsavelPopupRoute,
    ResponsavelResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...responsavelRoute,
    ...responsavelPopupRoute,
];

@NgModule({
    imports: [
        PaisNaEscolaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResponsavelComponent,
        ResponsavelDetailComponent,
        ResponsavelDialogComponent,
        ResponsavelDeleteDialogComponent,
        ResponsavelPopupComponent,
        ResponsavelDeletePopupComponent,
    ],
    entryComponents: [
        ResponsavelComponent,
        ResponsavelDialogComponent,
        ResponsavelPopupComponent,
        ResponsavelDeleteDialogComponent,
        ResponsavelDeletePopupComponent,
    ],
    providers: [
        ResponsavelService,
        ResponsavelPopupService,
        ResponsavelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaisNaEscolaResponsavelModule {}
