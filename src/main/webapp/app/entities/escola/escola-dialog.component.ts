import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Escola } from './escola.model';
import { EscolaPopupService } from './escola-popup.service';
import { EscolaService } from './escola.service';

@Component({
    selector: 'jhi-escola-dialog',
    templateUrl: './escola-dialog.component.html'
})
export class EscolaDialogComponent implements OnInit {

    escola: Escola;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private escolaService: EscolaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.escola.id !== undefined) {
            this.subscribeToSaveResponse(
                this.escolaService.update(this.escola));
        } else {
            this.subscribeToSaveResponse(
                this.escolaService.create(this.escola));
        }
    }

    private subscribeToSaveResponse(result: Observable<Escola>) {
        result.subscribe((res: Escola) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Escola) {
        this.eventManager.broadcast({ name: 'escolaListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-escola-popup',
    template: ''
})
export class EscolaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escolaPopupService: EscolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.escolaPopupService
                    .open(EscolaDialogComponent as Component, params['id']);
            } else {
                this.escolaPopupService
                    .open(EscolaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
