import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EscolaComponent } from './escola.component';
import { EscolaDetailComponent } from './escola-detail.component';
import { EscolaPopupComponent } from './escola-dialog.component';
import { EscolaDeletePopupComponent } from './escola-delete-dialog.component';

@Injectable()
export class EscolaResolvePagingParams implements Resolve<any> {

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

export const escolaRoute: Routes = [
    {
        path: 'escola',
        component: EscolaComponent,
        resolve: {
            'pagingParams': EscolaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.escola.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'escola/:id',
        component: EscolaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.escola.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const escolaPopupRoute: Routes = [
    {
        path: 'escola-new',
        component: EscolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.escola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escola/:id/edit',
        component: EscolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.escola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escola/:id/delete',
        component: EscolaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.escola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
