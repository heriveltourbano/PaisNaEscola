/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AlunoDetailComponent } from '../../../../../../main/webapp/app/entities/aluno/aluno-detail.component';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno/aluno.service';
import { Aluno } from '../../../../../../main/webapp/app/entities/aluno/aluno.model';

describe('Component Tests', () => {

    describe('Aluno Management Detail Component', () => {
        let comp: AlunoDetailComponent;
        let fixture: ComponentFixture<AlunoDetailComponent>;
        let service: AlunoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [AlunoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AlunoService,
                    JhiEventManager
                ]
            }).overrideTemplate(AlunoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlunoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlunoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Aluno(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.aluno).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
