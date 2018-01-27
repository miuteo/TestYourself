/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TestYourselfTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserAnswerDetailComponent } from '../../../../../../main/webapp/app/entities/user-answer/user-answer-detail.component';
import { UserAnswerService } from '../../../../../../main/webapp/app/entities/user-answer/user-answer.service';
import { UserAnswer } from '../../../../../../main/webapp/app/entities/user-answer/user-answer.model';

describe('Component Tests', () => {

    describe('UserAnswer Management Detail Component', () => {
        let comp: UserAnswerDetailComponent;
        let fixture: ComponentFixture<UserAnswerDetailComponent>;
        let service: UserAnswerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestYourselfTestModule],
                declarations: [UserAnswerDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserAnswerService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserAnswerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserAnswer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userAnswer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
