import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Mensagem } from './mensagem.model';
import { MensagemService } from './mensagem.service';

@Component({
    selector: 'jhi-mensagem-detail',
    templateUrl: './mensagem-detail.component.html'
})
export class MensagemDetailComponent implements OnInit, OnDestroy {

    mensagem: Mensagem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mensagemService: MensagemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMensagems();
    }

    load(id) {
        this.mensagemService.find(id).subscribe((mensagem) => {
            this.mensagem = mensagem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMensagems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mensagemListModification',
            (response) => this.load(this.mensagem.id)
        );
    }
}
