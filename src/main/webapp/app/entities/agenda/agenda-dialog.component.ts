import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { AgendaPopupService } from './agenda-popup.service';
import { AgendaService } from './agenda.service';
import { Classe, ClasseService } from '../classe';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-agenda-dialog',
    templateUrl: './agenda-dialog.component.html'
})
export class AgendaDialogComponent implements OnInit {

    agenda: Agenda;
    isSaving: boolean;

    classes: Classe[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private agendaService: AgendaService,
        private classeService: ClasseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.classeService.query()
            .subscribe((res: ResponseWrapper) => { this.classes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agenda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agendaService.update(this.agenda));
        } else {
            this.subscribeToSaveResponse(
                this.agendaService.create(this.agenda));
        }
    }

    private subscribeToSaveResponse(result: Observable<Agenda>) {
        result.subscribe((res: Agenda) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Agenda) {
        this.eventManager.broadcast({ name: 'agendaListModification', content: 'OK'});
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

    trackClasseById(index: number, item: Classe) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-agenda-popup',
    template: ''
})
export class AgendaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agendaPopupService: AgendaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agendaPopupService
                    .open(AgendaDialogComponent as Component, params['id']);
            } else {
                this.agendaPopupService
                    .open(AgendaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
