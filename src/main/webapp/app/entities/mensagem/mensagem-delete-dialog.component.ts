import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mensagem } from './mensagem.model';
import { MensagemPopupService } from './mensagem-popup.service';
import { MensagemService } from './mensagem.service';

@Component({
    selector: 'jhi-mensagem-delete-dialog',
    templateUrl: './mensagem-delete-dialog.component.html'
})
export class MensagemDeleteDialogComponent {

    mensagem: Mensagem;

    constructor(
        private mensagemService: MensagemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mensagemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mensagemListModification',
                content: 'Deleted an mensagem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mensagem-delete-popup',
    template: ''
})
export class MensagemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mensagemPopupService: MensagemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mensagemPopupService
                .open(MensagemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
