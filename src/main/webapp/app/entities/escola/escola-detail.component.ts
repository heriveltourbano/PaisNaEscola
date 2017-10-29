import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Escola } from './escola.model';
import { EscolaService } from './escola.service';

@Component({
    selector: 'jhi-escola-detail',
    templateUrl: './escola-detail.component.html'
})
export class EscolaDetailComponent implements OnInit, OnDestroy {

    escola: Escola;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private escolaService: EscolaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEscolas();
    }

    load(id) {
        this.escolaService.find(id).subscribe((escola) => {
            this.escola = escola;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEscolas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'escolaListModification',
            (response) => this.load(this.escola.id)
        );
    }
}
