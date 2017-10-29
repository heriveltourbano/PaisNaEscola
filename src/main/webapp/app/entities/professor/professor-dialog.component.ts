import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Professor } from './professor.model';
import { ProfessorPopupService } from './professor-popup.service';
import { ProfessorService } from './professor.service';
import { Usuario, UsuarioService } from '../usuario';
import { Classe, ClasseService } from '../classe';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-professor-dialog',
    templateUrl: './professor-dialog.component.html'
})
export class ProfessorDialogComponent implements OnInit {

    professor: Professor;
    isSaving: boolean;

    usuarios: Usuario[];

    classes: Classe[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private professorService: ProfessorService,
        private usuarioService: UsuarioService,
        private classeService: ClasseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'professor-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.professor.usuario || !this.professor.usuario.id) {
                    this.usuarios = res.json;
                } else {
                    this.usuarioService
                        .find(this.professor.usuario.id)
                        .subscribe((subRes: Usuario) => {
                            this.usuarios = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.classeService.query()
            .subscribe((res: ResponseWrapper) => { this.classes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorService.update(this.professor));
        } else {
            this.subscribeToSaveResponse(
                this.professorService.create(this.professor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Professor>) {
        result.subscribe((res: Professor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Professor) {
        this.eventManager.broadcast({ name: 'professorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    trackClasseById(index: number, item: Classe) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-professor-popup',
    template: ''
})
export class ProfessorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorPopupService: ProfessorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component, params['id']);
            } else {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
