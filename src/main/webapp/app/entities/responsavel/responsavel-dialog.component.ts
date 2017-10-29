import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Responsavel } from './responsavel.model';
import { ResponsavelPopupService } from './responsavel-popup.service';
import { ResponsavelService } from './responsavel.service';
import { Usuario, UsuarioService } from '../usuario';
import { Aluno, AlunoService } from '../aluno';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-responsavel-dialog',
    templateUrl: './responsavel-dialog.component.html'
})
export class ResponsavelDialogComponent implements OnInit {

    responsavel: Responsavel;
    isSaving: boolean;

    usuarios: Usuario[];

    alunos: Aluno[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private responsavelService: ResponsavelService,
        private usuarioService: UsuarioService,
        private alunoService: AlunoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'responsavel-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.responsavel.usuario || !this.responsavel.usuario.id) {
                    this.usuarios = res.json;
                } else {
                    this.usuarioService
                        .find(this.responsavel.usuario.id)
                        .subscribe((subRes: Usuario) => {
                            this.usuarios = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.responsavel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.responsavelService.update(this.responsavel));
        } else {
            this.subscribeToSaveResponse(
                this.responsavelService.create(this.responsavel));
        }
    }

    private subscribeToSaveResponse(result: Observable<Responsavel>) {
        result.subscribe((res: Responsavel) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Responsavel) {
        this.eventManager.broadcast({ name: 'responsavelListModification', content: 'OK'});
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

    trackAlunoById(index: number, item: Aluno) {
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
    selector: 'jhi-responsavel-popup',
    template: ''
})
export class ResponsavelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private responsavelPopupService: ResponsavelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.responsavelPopupService
                    .open(ResponsavelDialogComponent as Component, params['id']);
            } else {
                this.responsavelPopupService
                    .open(ResponsavelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
