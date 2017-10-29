import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { AgendaPopupService } from './agenda-popup.service';
import { AgendaService } from './agenda.service';

@Component({
    selector: 'jhi-agenda-delete-dialog',
    templateUrl: './agenda-delete-dialog.component.html'
})
export class AgendaDeleteDialogComponent {

    agenda: Agenda;

    constructor(
        private agendaService: AgendaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agendaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'agendaListModification',
                content: 'Deleted an agenda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agenda-delete-popup',
    template: ''
})
export class AgendaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agendaPopupService: AgendaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.agendaPopupService
                .open(AgendaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
