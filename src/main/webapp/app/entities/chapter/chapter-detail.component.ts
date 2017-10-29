import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Chapter } from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
    selector: 'jhi-chapter-detail',
    templateUrl: './chapter-detail.component.html'
})
export class ChapterDetailComponent implements OnInit, OnDestroy {

    chapter: Chapter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chapterService: ChapterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChapters();
    }

    load(id) {
        this.chapterService.find(id).subscribe((chapter) => {
            this.chapter = chapter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChapters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chapterListModification',
            (response) => this.load(this.chapter.id)
        );
    }
}
