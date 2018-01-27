import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestYourselfBookModule } from './book/book.module';
import { TestYourselfChapterModule } from './chapter/chapter.module';
import { TestYourselfQuestionModule } from './question/question.module';
import { TestYourselfAnswerModule } from './answer/answer.module';
import { TestYourselfUserVariantModule } from './user-variant/user-variant.module';
import { TestYourselfUserAnswerModule } from './user-answer/user-answer.module';
import { TestYourselfExamModule } from './exam/exam.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TestYourselfBookModule,
        TestYourselfChapterModule,
        TestYourselfQuestionModule,
        TestYourselfAnswerModule,
        TestYourselfUserVariantModule,
        TestYourselfUserAnswerModule,
        TestYourselfExamModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfEntityModule {}
