import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { AlunoPopupService } from './aluno-popup.service';
import { AlunoService } from './aluno.service';

@Component({
    selector: 'jhi-aluno-delete-dialog',
    templateUrl: './aluno-delete-dialog.component.html'
})
export class AlunoDeleteDialogComponent {

    aluno: Aluno;

    constructor(
        private alunoService: AlunoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alunoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alunoListModification',
                content: 'Deleted an aluno'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aluno-delete-popup',
    template: ''
})
export class AlunoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alunoPopupService: AlunoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alunoPopupService
                .open(AlunoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
