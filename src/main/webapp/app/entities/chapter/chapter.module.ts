import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import {
    ChapterService,
    ChapterPopupService,
    ChapterComponent,
    ChapterDetailComponent,
    ChapterDialogComponent,
    ChapterPopupComponent,
    ChapterDeletePopupComponent,
    ChapterDeleteDialogComponent,
    chapterRoute,
    chapterPopupRoute,
    ChapterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chapterRoute,
    ...chapterPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChapterComponent,
        ChapterDetailComponent,
        ChapterDialogComponent,
        ChapterDeleteDialogComponent,
        ChapterPopupComponent,
        ChapterDeletePopupComponent,
    ],
    entryComponents: [
        ChapterComponent,
        ChapterDialogComponent,
        ChapterPopupComponent,
        ChapterDeleteDialogComponent,
        ChapterDeletePopupComponent,
    ],
    providers: [
        ChapterService,
        ChapterPopupService,
        ChapterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfChapterModule {}
