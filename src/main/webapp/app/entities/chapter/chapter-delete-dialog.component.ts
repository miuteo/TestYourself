import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chapter } from './chapter.model';
import { ChapterPopupService } from './chapter-popup.service';
import { ChapterService } from './chapter.service';

@Component({
    selector: 'jhi-chapter-delete-dialog',
    templateUrl: './chapter-delete-dialog.component.html'
})
export class ChapterDeleteDialogComponent {

    chapter: Chapter;

    constructor(
        private chapterService: ChapterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chapterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chapterListModification',
                content: 'Deleted an chapter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chapter-delete-popup',
    template: ''
})
export class ChapterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chapterPopupService: ChapterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chapterPopupService
                .open(ChapterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
