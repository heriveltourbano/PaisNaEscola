import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mensagem } from './mensagem.model';
import { MensagemPopupService } from './mensagem-popup.service';
import { MensagemService } from './mensagem.service';
import { Usuario, UsuarioService } from '../usuario';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mensagem-dialog',
    templateUrl: './mensagem-dialog.component.html'
})
export class MensagemDialogComponent implements OnInit {

    mensagem: Mensagem;
    isSaving: boolean;

    remetentes: Usuario[];

    destinatarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private mensagemService: MensagemService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'mensagem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.mensagem.remetente || !this.mensagem.remetente.id) {
                    this.remetentes = res.json;
                } else {
                    this.usuarioService
                        .find(this.mensagem.remetente.id)
                        .subscribe((subRes: Usuario) => {
                            this.remetentes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.usuarioService
            .query({filter: 'mensagem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.mensagem.destinatario || !this.mensagem.destinatario.id) {
                    this.destinatarios = res.json;
                } else {
                    this.usuarioService
                        .find(this.mensagem.destinatario.id)
                        .subscribe((subRes: Usuario) => {
                            this.destinatarios = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mensagem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mensagemService.update(this.mensagem));
        } else {
            this.subscribeToSaveResponse(
                this.mensagemService.create(this.mensagem));
        }
    }

    private subscribeToSaveResponse(result: Observable<Mensagem>) {
        result.subscribe((res: Mensagem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Mensagem) {
        this.eventManager.broadcast({ name: 'mensagemListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-mensagem-popup',
    template: ''
})
export class MensagemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mensagemPopupService: MensagemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mensagemPopupService
                    .open(MensagemDialogComponent as Component, params['id']);
            } else {
                this.mensagemPopupService
                    .open(MensagemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
