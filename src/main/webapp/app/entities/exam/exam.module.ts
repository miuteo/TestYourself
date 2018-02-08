import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import { TestYourselfAdminModule } from '../../admin/admin.module';
import {
    ExamService,
    ExamPopupService,
    ExamComponent,
    ExamDetailComponent,
    ExamDialogComponent,
    ExamPopupComponent,
    ExamDeletePopupComponent,
    ExamDeleteDialogComponent,
    ExamGeneratePopupComponent,
    ExamGenerateDialogComponent,
    examRoute,
    examPopupRoute,
} from './';
import {ExamResolveComponent} from './exam-resolve.component';
import {ExamPopupViewScoreComponent, ExamViewScoreComponent} from './exam-view-score.component';

const ENTITY_STATES = [
    ...examRoute,
    ...examPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        TestYourselfAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExamComponent,
        ExamDetailComponent,
        ExamDialogComponent,
        ExamDeleteDialogComponent,
        ExamGenerateDialogComponent,
        ExamPopupComponent,
        ExamDeletePopupComponent,
        ExamGeneratePopupComponent,
        ExamResolveComponent,
        ExamViewScoreComponent,
        ExamPopupViewScoreComponent
    ],
    entryComponents: [
        ExamComponent,
        ExamDialogComponent,
        ExamPopupComponent,
        ExamDeleteDialogComponent,
        ExamGenerateDialogComponent,
        ExamDeletePopupComponent,
        ExamGeneratePopupComponent,
        ExamViewScoreComponent
    ],
    providers: [
        ExamService,
        ExamPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfExamModule {}
