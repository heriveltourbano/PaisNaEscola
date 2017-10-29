import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Responsavel } from './responsavel.model';
import { ResponsavelService } from './responsavel.service';

@Component({
    selector: 'jhi-responsavel-detail',
    templateUrl: './responsavel-detail.component.html'
})
export class ResponsavelDetailComponent implements OnInit, OnDestroy {

    responsavel: Responsavel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private responsavelService: ResponsavelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResponsavels();
    }

    load(id) {
        this.responsavelService.find(id).subscribe((responsavel) => {
            this.responsavel = responsavel;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResponsavels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'responsavelListModification',
            (response) => this.load(this.responsavel.id)
        );
    }
}
