import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import {
    AnswerService,
    AnswerPopupService,
    AnswerComponent,
    AnswerDetailComponent,
    AnswerDialogComponent,
    AnswerPopupComponent,
    AnswerDeletePopupComponent,
    AnswerDeleteDialogComponent,
    answerRoute,
    answerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...answerRoute,
    ...answerPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnswerComponent,
        AnswerDetailComponent,
        AnswerDialogComponent,
        AnswerDeleteDialogComponent,
        AnswerPopupComponent,
        AnswerDeletePopupComponent,
    ],
    entryComponents: [
        AnswerComponent,
        AnswerDialogComponent,
        AnswerPopupComponent,
        AnswerDeleteDialogComponent,
        AnswerDeletePopupComponent,
    ],
    providers: [
        AnswerService,
        AnswerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfAnswerModule {}
