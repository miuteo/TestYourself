import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { UserAnswer } from './user-answer.model';
import { UserAnswerService } from './user-answer.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-user-answer',
    templateUrl: './user-answer.component.html'
})
export class UserAnswerComponent implements OnInit, OnDestroy {
userAnswers: UserAnswer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userAnswerService: UserAnswerService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userAnswerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userAnswers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserAnswer) {
        return item.id;
    }
    registerChangeInUserAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('userAnswerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
