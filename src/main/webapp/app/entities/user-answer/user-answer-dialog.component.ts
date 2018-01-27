import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserAnswer } from './user-answer.model';
import { UserAnswerPopupService } from './user-answer-popup.service';
import { UserAnswerService } from './user-answer.service';
import { Question, QuestionService } from '../question';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-answer-dialog',
    templateUrl: './user-answer-dialog.component.html'
})
export class UserAnswerDialogComponent implements OnInit {

    userAnswer: UserAnswer;
    isSaving: boolean;

    questions: Question[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private userAnswerService: UserAnswerService,
        private questionService: QuestionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.questionService
            .query({filter: 'useranswer-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.userAnswer.question || !this.userAnswer.question.id) {
                    this.questions = res.json;
                } else {
                    this.questionService
                        .find(this.userAnswer.question.id)
                        .subscribe((subRes: Question) => {
                            this.questions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userAnswer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAnswerService.update(this.userAnswer));
        } else {
            this.subscribeToSaveResponse(
                this.userAnswerService.create(this.userAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserAnswer>) {
        result.subscribe((res: UserAnswer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserAnswer) {
        this.eventManager.broadcast({ name: 'userAnswerListModification', content: 'OK'});
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
    selector: 'jhi-user-answer-popup',
    template: ''
})
export class UserAnswerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerPopupService: UserAnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAnswerPopupService
                    .open(UserAnswerDialogComponent as Component, params['id']);
            } else {
                this.userAnswerPopupService
                    .open(UserAnswerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
