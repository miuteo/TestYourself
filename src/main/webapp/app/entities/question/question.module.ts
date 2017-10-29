import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import {
    QuestionService,
    QuestionPopupService,
    QuestionComponent,
    QuestionDetailComponent,
    QuestionDialogComponent,
    QuestionPopupComponent,
    QuestionDeletePopupComponent,
    QuestionDeleteDialogComponent,
    questionRoute,
    questionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...questionRoute,
    ...questionPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        QuestionComponent,
        QuestionDetailComponent,
        QuestionDialogComponent,
        QuestionDeleteDialogComponent,
        QuestionPopupComponent,
        QuestionDeletePopupComponent,
    ],
    entryComponents: [
        QuestionComponent,
        QuestionDialogComponent,
        QuestionPopupComponent,
        QuestionDeleteDialogComponent,
        QuestionDeletePopupComponent,
    ],
    providers: [
        QuestionService,
        QuestionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfQuestionModule {}
