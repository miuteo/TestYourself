/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TestYourselfTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChapterDetailComponent } from '../../../../../../main/webapp/app/entities/chapter/chapter-detail.component';
import { ChapterService } from '../../../../../../main/webapp/app/entities/chapter/chapter.service';
import { Chapter } from '../../../../../../main/webapp/app/entities/chapter/chapter.model';

describe('Component Tests', () => {

    describe('Chapter Management Detail Component', () => {
        let comp: ChapterDetailComponent;
        let fixture: ComponentFixture<ChapterDetailComponent>;
        let service: ChapterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestYourselfTestModule],
                declarations: [ChapterDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChapterService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChapterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChapterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChapterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Chapter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chapter).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
