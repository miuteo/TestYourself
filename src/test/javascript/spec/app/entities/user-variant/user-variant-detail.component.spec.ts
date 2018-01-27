/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TestYourselfTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserVariantDetailComponent } from '../../../../../../main/webapp/app/entities/user-variant/user-variant-detail.component';
import { UserVariantService } from '../../../../../../main/webapp/app/entities/user-variant/user-variant.service';
import { UserVariant } from '../../../../../../main/webapp/app/entities/user-variant/user-variant.model';

describe('Component Tests', () => {

    describe('UserVariant Management Detail Component', () => {
        let comp: UserVariantDetailComponent;
        let fixture: ComponentFixture<UserVariantDetailComponent>;
        let service: UserVariantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestYourselfTestModule],
                declarations: [UserVariantDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserVariantService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserVariantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserVariantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserVariantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserVariant(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userVariant).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
