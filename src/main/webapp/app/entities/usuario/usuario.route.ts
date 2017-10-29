import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UsuarioComponent } from './usuario.component';
import { UsuarioDetailComponent } from './usuario-detail.component';
import { UsuarioPopupComponent } from './usuario-dialog.component';
import { UsuarioDeletePopupComponent } from './usuario-delete-dialog.component';

@Injectable()
export class UsuarioResolvePagingParams implements Resolve<any> {

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

export const usuarioRoute: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        resolve: {
            'pagingParams': UsuarioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario/:id',
        component: UsuarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-new',
        component: UsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario/:id/edit',
        component: UsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario/:id/delete',
        component: UsuarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
