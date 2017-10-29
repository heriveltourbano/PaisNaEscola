import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Responsavel } from './responsavel.model';
import { ResponsavelPopupService } from './responsavel-popup.service';
import { ResponsavelService } from './responsavel.service';

@Component({
    selector: 'jhi-responsavel-delete-dialog',
    templateUrl: './responsavel-delete-dialog.component.html'
})
export class ResponsavelDeleteDialogComponent {

    responsavel: Responsavel;

    constructor(
        private responsavelService: ResponsavelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.responsavelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'responsavelListModification',
                content: 'Deleted an responsavel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-responsavel-delete-popup',
    template: ''
})
export class ResponsavelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private responsavelPopupService: ResponsavelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.responsavelPopupService
                .open(ResponsavelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
