import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Answer } from './answer.model';
import { AnswerPopupService } from './answer-popup.service';
import { AnswerService } from './answer.service';
import { Question, QuestionService } from '../question';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-answer-dialog',
    templateUrl: './answer-dialog.component.html'
})
export class AnswerDialogComponent implements OnInit {

    answer: Answer;
    isSaving: boolean;

    questions: Question[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private answerService: AnswerService,
        private questionService: QuestionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.questionService.query()
            .subscribe((res: ResponseWrapper) => { this.questions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.answer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.answerService.update(this.answer));
        } else {
            this.subscribeToSaveResponse(
                this.answerService.create(this.answer));
        }
    }

    private subscribeToSaveResponse(result: Observable<Answer>) {
        result.subscribe((res: Answer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Answer) {
        this.eventManager.broadcast({ name: 'answerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackQuestionById(index: number, item: Question) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-answer-popup',
    template: ''
})
export class AnswerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component, params['id']);
            } else {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
