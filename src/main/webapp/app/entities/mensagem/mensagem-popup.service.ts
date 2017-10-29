import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Mensagem } from './mensagem.model';
import { MensagemService } from './mensagem.service';

@Injectable()
export class MensagemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private mensagemService: MensagemService

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
                this.mensagemService.find(id).subscribe((mensagem) => {
                    mensagem.criada = this.datePipe
                        .transform(mensagem.criada, 'yyyy-MM-ddThh:mm');
                    mensagem.enviada = this.datePipe
                        .transform(mensagem.enviada, 'yyyy-MM-ddThh:mm');
                    mensagem.recebida = this.datePipe
                        .transform(mensagem.recebida, 'yyyy-MM-ddThh:mm');
                    mensagem.lida = this.datePipe
                        .transform(mensagem.lida, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.mensagemModalRef(component, mensagem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mensagemModalRef(component, new Mensagem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mensagemModalRef(component: Component, mensagem: Mensagem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mensagem = mensagem;
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
