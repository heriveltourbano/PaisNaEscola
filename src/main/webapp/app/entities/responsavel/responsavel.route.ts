import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResponsavelComponent } from './responsavel.component';
import { ResponsavelDetailComponent } from './responsavel-detail.component';
import { ResponsavelPopupComponent } from './responsavel-dialog.component';
import { ResponsavelDeletePopupComponent } from './responsavel-delete-dialog.component';

@Injectable()
export class ResponsavelResolvePagingParams implements Resolve<any> {

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

export const responsavelRoute: Routes = [
    {
        path: 'responsavel',
        component: ResponsavelComponent,
        resolve: {
            'pagingParams': ResponsavelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.responsavel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'responsavel/:id',
        component: ResponsavelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.responsavel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const responsavelPopupRoute: Routes = [
    {
        path: 'responsavel-new',
        component: ResponsavelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.responsavel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'responsavel/:id/edit',
        component: ResponsavelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.responsavel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'responsavel/:id/delete',
        component: ResponsavelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.responsavel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
