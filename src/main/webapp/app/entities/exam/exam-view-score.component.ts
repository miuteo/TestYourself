import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamPopupService} from './exam-popup.service';

@Component({
    selector: 'jhi-exam-view-score',
    templateUrl: './exam-view-score.component.html'
})
export class ExamViewScoreComponent {

}

@Component({
    selector: 'jhi-exam-view-score-popup',
    template: ''
})
export class ExamPopupViewScoreComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private examPopupService: ExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.examPopupService
                    .open(ExamViewScoreComponent as Component, params['id']);
            } else {
                this.examPopupService
                    .open(ExamViewScoreComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
