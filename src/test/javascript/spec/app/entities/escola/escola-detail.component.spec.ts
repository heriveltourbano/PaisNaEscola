/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EscolaDetailComponent } from '../../../../../../main/webapp/app/entities/escola/escola-detail.component';
import { EscolaService } from '../../../../../../main/webapp/app/entities/escola/escola.service';
import { Escola } from '../../../../../../main/webapp/app/entities/escola/escola.model';

describe('Component Tests', () => {

    describe('Escola Management Detail Component', () => {
        let comp: EscolaDetailComponent;
        let fixture: ComponentFixture<EscolaDetailComponent>;
        let service: EscolaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [EscolaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EscolaService,
                    JhiEventManager
                ]
            }).overrideTemplate(EscolaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscolaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscolaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Escola(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.escola).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
