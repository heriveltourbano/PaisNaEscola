import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AlunoComponent } from './aluno.component';
import { AlunoDetailComponent } from './aluno-detail.component';
import { AlunoPopupComponent } from './aluno-dialog.component';
import { AlunoDeletePopupComponent } from './aluno-delete-dialog.component';

@Injectable()
export class AlunoResolvePagingParams implements Resolve<any> {

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

export const alunoRoute: Routes = [
    {
        path: 'aluno',
        component: AlunoComponent,
        resolve: {
            'pagingParams': AlunoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aluno/:id',
        component: AlunoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alunoPopupRoute: Routes = [
    {
        path: 'aluno-new',
        component: AlunoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aluno/:id/edit',
        component: AlunoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aluno/:id/delete',
        component: AlunoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
