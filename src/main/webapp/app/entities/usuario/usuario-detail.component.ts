import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'jhi-usuario-detail',
    templateUrl: './usuario-detail.component.html'
})
export class UsuarioDetailComponent implements OnInit, OnDestroy {

    usuario: Usuario;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarioService: UsuarioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarios();
    }

    load(id) {
        this.usuarioService.find(id).subscribe((usuario) => {
            this.usuario = usuario;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarioListModification',
            (response) => this.load(this.usuario.id)
        );
    }
}
