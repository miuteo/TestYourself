import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Exam } from './exam.model';
import { ExamService } from './exam.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import {Response} from '@angular/http'  ;

@Component({
    selector: 'jhi-exam',
    templateUrl: './exam.component.html'
})
export class ExamComponent implements OnInit, OnDestroy {

    exams: Exam[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private examService: ExamService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.exams = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.examService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.exams = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Exam) {
        return item.id;
    }
    registerChangeInExams() {
        this.eventSubscriber = this.eventManager.subscribe('examListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.exams.push(data[i]);
        }
    }
    private subscribeToSaveResponse(result: Observable<Exam>) {
        result.subscribe((res: Exam) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }
    newExam() {
        // this.isSaving = true;

        this.subscribeToSaveResponse(
            this.examService.generateNewExam());

    }
    private onSaveSuccess(result: Exam) {
        this.eventManager.broadcast({ name: 'examListModification', content: 'OK'});
        // this.isSaving = false;

    }

    private onSaveError() {
        // this.isSaving = false;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
