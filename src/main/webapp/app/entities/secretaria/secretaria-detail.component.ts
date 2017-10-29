import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Secretaria } from './secretaria.model';
import { SecretariaService } from './secretaria.service';

@Component({
    selector: 'jhi-secretaria-detail',
    templateUrl: './secretaria-detail.component.html'
})
export class SecretariaDetailComponent implements OnInit, OnDestroy {

    secretaria: Secretaria;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private secretariaService: SecretariaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSecretarias();
    }

    load(id) {
        this.secretariaService.find(id).subscribe((secretaria) => {
            this.secretaria = secretaria;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSecretarias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'secretariaListModification',
            (response) => this.load(this.secretaria.id)
        );
    }
}
