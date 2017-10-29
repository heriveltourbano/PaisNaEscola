import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SecretariaComponent } from './secretaria.component';
import { SecretariaDetailComponent } from './secretaria-detail.component';
import { SecretariaPopupComponent } from './secretaria-dialog.component';
import { SecretariaDeletePopupComponent } from './secretaria-delete-dialog.component';

@Injectable()
export class SecretariaResolvePagingParams implements Resolve<any> {

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

export const secretariaRoute: Routes = [
    {
        path: 'secretaria',
        component: SecretariaComponent,
        resolve: {
            'pagingParams': SecretariaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.secretaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'secretaria/:id',
        component: SecretariaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.secretaria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const secretariaPopupRoute: Routes = [
    {
        path: 'secretaria-new',
        component: SecretariaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.secretaria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'secretaria/:id/edit',
        component: SecretariaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.secretaria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'secretaria/:id/delete',
        component: SecretariaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.secretaria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
