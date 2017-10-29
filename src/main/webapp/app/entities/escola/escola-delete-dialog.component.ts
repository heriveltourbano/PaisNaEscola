import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Escola } from './escola.model';
import { EscolaPopupService } from './escola-popup.service';
import { EscolaService } from './escola.service';

@Component({
    selector: 'jhi-escola-delete-dialog',
    templateUrl: './escola-delete-dialog.component.html'
})
export class EscolaDeleteDialogComponent {

    escola: Escola;

    constructor(
        private escolaService: EscolaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.escolaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'escolaListModification',
                content: 'Deleted an escola'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-escola-delete-popup',
    template: ''
})
export class EscolaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escolaPopupService: EscolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.escolaPopupService
                .open(EscolaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
