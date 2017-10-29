import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Agenda } from './agenda.model';
import { AgendaService } from './agenda.service';

@Injectable()
export class AgendaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private agendaService: AgendaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.agendaService.find(id).subscribe((agenda) => {
                    agenda.inicio = this.datePipe
                        .transform(agenda.inicio, 'yyyy-MM-ddThh:mm');
                    agenda.termino = this.datePipe
                        .transform(agenda.termino, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.agendaModalRef(component, agenda);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.agendaModalRef(component, new Agenda());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    agendaModalRef(component: Component, agenda: Agenda): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.agenda = agenda;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
