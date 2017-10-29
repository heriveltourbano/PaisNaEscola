/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PaisNaEscolaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResponsavelDetailComponent } from '../../../../../../main/webapp/app/entities/responsavel/responsavel-detail.component';
import { ResponsavelService } from '../../../../../../main/webapp/app/entities/responsavel/responsavel.service';
import { Responsavel } from '../../../../../../main/webapp/app/entities/responsavel/responsavel.model';

describe('Component Tests', () => {

    describe('Responsavel Management Detail Component', () => {
        let comp: ResponsavelDetailComponent;
        let fixture: ComponentFixture<ResponsavelDetailComponent>;
        let service: ResponsavelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PaisNaEscolaTestModule],
                declarations: [ResponsavelDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResponsavelService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResponsavelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResponsavelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResponsavelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Responsavel(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.responsavel).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
