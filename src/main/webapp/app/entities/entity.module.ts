import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestYourselfBookModule } from './book/book.module';
import { TestYourselfChapterModule } from './chapter/chapter.module';
import { TestYourselfQuestionModule } from './question/question.module';
import { TestYourselfAnswerModule } from './answer/answer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TestYourselfBookModule,
        TestYourselfChapterModule,
        TestYourselfQuestionModule,
        TestYourselfAnswerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfEntityModule {}
