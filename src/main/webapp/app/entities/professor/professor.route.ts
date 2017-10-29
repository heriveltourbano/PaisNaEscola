import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProfessorComponent } from './professor.component';
import { ProfessorDetailComponent } from './professor-detail.component';
import { ProfessorPopupComponent } from './professor-dialog.component';
import { ProfessorDeletePopupComponent } from './professor-delete-dialog.component';

@Injectable()
export class ProfessorResolvePagingParams implements Resolve<any> {

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

export const professorRoute: Routes = [
    {
        path: 'professor',
        component: ProfessorComponent,
        resolve: {
            'pagingParams': ProfessorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professor/:id',
        component: ProfessorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professorPopupRoute: Routes = [
    {
        path: 'professor-new',
        component: ProfessorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor/:id/edit',
        component: ProfessorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor/:id/delete',
        component: ProfessorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'paisNaEscolaApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
