import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AgendaComponent } from './agenda.component';
import { AgendaDetailComponent } from './agenda-detail.component';
import { AgendaPopupComponent } from './agenda-dialog.component';
import { AgendaDeletePopupComponent } from './agenda-delete-dialog.component';

@Injectable()
export class AgendaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const agendaRoute: Routes = [
    {
        path: 'agenda',
        component: AgendaComponent,
        resolve: {
            'pagingParams': AgendaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agenda/:id',
        component: AgendaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agendaPopupRoute: Routes = [
    {
        path: 'agenda-new',
        component: AgendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenda/:id/edit',
        component: AgendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenda/:id/delete',
        component: AgendaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
