/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuarioDetailComponent } from '../../../../../../main/webapp/app/entities/usuario/usuario-detail.component';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario/usuario.service';
import { Usuario } from '../../../../../../main/webapp/app/entities/usuario/usuario.model';

describe('Component Tests', () => {

    describe('Usuario Management Detail Component', () => {
        let comp: UsuarioDetailComponent;
        let fixture: ComponentFixture<UsuarioDetailComponent>;
        let service: UsuarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [UsuarioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuarioService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuarioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Usuario(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuario).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
