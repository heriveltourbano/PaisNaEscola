/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MensagemDetailComponent } from '../../../../../../main/webapp/app/entities/mensagem/mensagem-detail.component';
import { MensagemService } from '../../../../../../main/webapp/app/entities/mensagem/mensagem.service';
import { Mensagem } from '../../../../../../main/webapp/app/entities/mensagem/mensagem.model';

describe('Component Tests', () => {

    describe('Mensagem Management Detail Component', () => {
        let comp: MensagemDetailComponent;
        let fixture: ComponentFixture<MensagemDetailComponent>;
        let service: MensagemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [MensagemDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MensagemService,
                    JhiEventManager
                ]
            }).overrideTemplate(MensagemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MensagemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensagemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mensagem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mensagem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
