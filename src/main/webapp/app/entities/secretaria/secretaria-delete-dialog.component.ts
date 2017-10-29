import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Secretaria } from './secretaria.model';
import { SecretariaPopupService } from './secretaria-popup.service';
import { SecretariaService } from './secretaria.service';

@Component({
    selector: 'jhi-secretaria-delete-dialog',
    templateUrl: './secretaria-delete-dialog.component.html'
})
export class SecretariaDeleteDialogComponent {

    secretaria: Secretaria;

    constructor(
        private secretariaService: SecretariaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.secretariaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'secretariaListModification',
                content: 'Deleted an secretaria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-secretaria-delete-popup',
    template: ''
})
export class SecretariaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private secretariaPopupService: SecretariaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.secretariaPopupService
                .open(SecretariaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
