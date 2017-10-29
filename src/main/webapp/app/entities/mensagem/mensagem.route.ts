import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MensagemComponent } from './mensagem.component';
import { MensagemDetailComponent } from './mensagem-detail.component';
import { MensagemPopupComponent } from './mensagem-dialog.component';
import { MensagemDeletePopupComponent } from './mensagem-delete-dialog.component';

export const mensagemRoute: Routes = [
    {
        path: 'mensagem',
        component: MensagemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.mensagem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mensagem/:id',
        component: MensagemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.mensagem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mensagemPopupRoute: Routes = [
    {
        path: 'mensagem-new',
        component: MensagemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.mensagem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mensagem/:id/edit',
        component: MensagemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.mensagem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mensagem/:id/delete',
        component: MensagemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.mensagem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
