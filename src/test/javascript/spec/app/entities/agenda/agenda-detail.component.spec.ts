/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AgendaDetailComponent } from '../../../../../../main/webapp/app/entities/agenda/agenda-detail.component';
import { AgendaService } from '../../../../../../main/webapp/app/entities/agenda/agenda.service';
import { Agenda } from '../../../../../../main/webapp/app/entities/agenda/agenda.model';

describe('Component Tests', () => {

    describe('Agenda Management Detail Component', () => {
        let comp: AgendaDetailComponent;
        let fixture: ComponentFixture<AgendaDetailComponent>;
        let service: AgendaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [AgendaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AgendaService,
                    JhiEventManager
                ]
            }).overrideTemplate(AgendaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgendaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Agenda(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.agenda).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
