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
    examRoute,
    examPopupRoute,
} from './';

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
        ExamPopupComponent,
        ExamDeletePopupComponent,
    ],
    entryComponents: [
        ExamComponent,
        ExamDialogComponent,
        ExamPopupComponent,
        ExamDeleteDialogComponent,
        ExamDeletePopupComponent,
    ],
    providers: [
        ExamService,
        ExamPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfExamModule {}