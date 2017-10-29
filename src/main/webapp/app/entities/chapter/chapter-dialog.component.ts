import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Chapter } from './chapter.model';
import { ChapterPopupService } from './chapter-popup.service';
import { ChapterService } from './chapter.service';
import { Book, BookService } from '../book';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-chapter-dialog',
    templateUrl: './chapter-dialog.component.html'
})
export class ChapterDialogComponent implements OnInit {

    chapter: Chapter;
    isSaving: boolean;

    books: Book[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private chapterService: ChapterService,
        private bookService: BookService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bookService.query()
            .subscribe((res: ResponseWrapper) => { this.books = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chapter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chapterService.update(this.chapter));
        } else {
            this.subscribeToSaveResponse(
                this.chapterService.create(this.chapter));
        }
    }

    private subscribeToSaveResponse(result: Observable<Chapter>) {
        result.subscribe((res: Chapter) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Chapter) {
        this.eventManager.broadcast({ name: 'chapterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackBookById(index: number, item: Book) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chapter-popup',
    template: ''
})
export class ChapterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chapterPopupService: ChapterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chapterPopupService
                    .open(ChapterDialogComponent as Component, params['id']);
            } else {
                this.chapterPopupService
                    .open(ChapterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
