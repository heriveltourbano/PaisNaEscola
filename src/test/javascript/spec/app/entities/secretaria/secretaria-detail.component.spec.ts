/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SecretariaDetailComponent } from '../../../../../../main/webapp/app/entities/secretaria/secretaria-detail.component';
import { SecretariaService } from '../../../../../../main/webapp/app/entities/secretaria/secretaria.service';
import { Secretaria } from '../../../../../../main/webapp/app/entities/secretaria/secretaria.model';

describe('Component Tests', () => {

    describe('Secretaria Management Detail Component', () => {
        let comp: SecretariaDetailComponent;
        let fixture: ComponentFixture<SecretariaDetailComponent>;
        let service: SecretariaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [SecretariaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SecretariaService,
                    JhiEventManager
                ]
            }).overrideTemplate(SecretariaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SecretariaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SecretariaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Secretaria(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.secretaria).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
