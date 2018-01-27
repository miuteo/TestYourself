import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import {
    UserAnswerService,
    UserAnswerPopupService,
    UserAnswerComponent,
    UserAnswerDetailComponent,
    UserAnswerDialogComponent,
    UserAnswerPopupComponent,
    UserAnswerDeletePopupComponent,
    UserAnswerDeleteDialogComponent,
    userAnswerRoute,
    userAnswerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userAnswerRoute,
    ...userAnswerPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserAnswerComponent,
        UserAnswerDetailComponent,
        UserAnswerDialogComponent,
        UserAnswerDeleteDialogComponent,
        UserAnswerPopupComponent,
        UserAnswerDeletePopupComponent,
    ],
    entryComponents: [
        UserAnswerComponent,
        UserAnswerDialogComponent,
        UserAnswerPopupComponent,
        UserAnswerDeleteDialogComponent,
        UserAnswerDeletePopupComponent,
    ],
    providers: [
        UserAnswerService,
        UserAnswerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfUserAnswerModule {}
