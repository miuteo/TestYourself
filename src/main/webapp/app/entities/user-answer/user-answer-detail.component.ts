import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserAnswer } from './user-answer.model';
import { UserAnswerService } from './user-answer.service';

@Component({
    selector: 'jhi-user-answer-detail',
    templateUrl: './user-answer-detail.component.html'
})
export class UserAnswerDetailComponent implements OnInit, OnDestroy {

    userAnswer: UserAnswer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userAnswerService: UserAnswerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserAnswers();
    }

    load(id) {
        this.userAnswerService.find(id).subscribe((userAnswer) => {
            this.userAnswer = userAnswer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserAnswers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userAnswerListModification',
            (response) => this.load(this.userAnswer.id)
        );
    }
}
