import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Secretaria } from './secretaria.model';
import { SecretariaPopupService } from './secretaria-popup.service';
import { SecretariaService } from './secretaria.service';
import { Usuario, UsuarioService } from '../usuario';
import { Escola, EscolaService } from '../escola';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-secretaria-dialog',
    templateUrl: './secretaria-dialog.component.html'
})
export class SecretariaDialogComponent implements OnInit {

    secretaria: Secretaria;
    isSaving: boolean;

    usuarios: Usuario[];

    escolas: Escola[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private secretariaService: SecretariaService,
        private usuarioService: UsuarioService,
        private escolaService: EscolaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'secretaria-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.secretaria.usuario || !this.secretaria.usuario.id) {
                    this.usuarios = res.json;
                } else {
                    this.usuarioService
                        .find(this.secretaria.usuario.id)
                        .subscribe((subRes: Usuario) => {
                            this.usuarios = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.escolaService.query()
            .subscribe((res: ResponseWrapper) => { this.escolas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.secretaria.id !== undefined) {
            this.subscribeToSaveResponse(
                this.secretariaService.update(this.secretaria));
        } else {
            this.subscribeToSaveResponse(
                this.secretariaService.create(this.secretaria));
        }
    }

    private subscribeToSaveResponse(result: Observable<Secretaria>) {
        result.subscribe((res: Secretaria) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Secretaria) {
        this.eventManager.broadcast({ name: 'secretariaListModification', content: 'OK'});
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

    trackEscolaById(index: number, item: Escola) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-secretaria-popup',
    template: ''
})
export class SecretariaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private secretariaPopupService: SecretariaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.secretariaPopupService
                    .open(SecretariaDialogComponent as Component, params['id']);
            } else {
                this.secretariaPopupService
                    .open(SecretariaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
