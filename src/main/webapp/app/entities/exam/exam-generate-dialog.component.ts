import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Exam } from './exam.model';
import { ExamPopupService } from './exam-popup.service';
import { ExamService } from './exam.service';

@Component({
    selector: 'jhi-exam-generate-dialog',
    templateUrl: './exam-generate-dialog.component.html'
})
export class ExamGenerateDialogComponent  {

    exam: Exam;
    isLoading: boolean;

    constructor(
        private examService: ExamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmGenerate() {
        this.isLoading = true;
        this.examService.generateNewExam()
            .finally(() => {
                    setTimeout(() => {
                        this.router.navigate(['/exam-resolve/']);
                    }, 0);
                    this.activeModal.dismiss(true);
                    this.isLoading = false;
                }
                )
            .subscribe((response) => {
            this.exam = response;
            this.isLoading = false;
        });

     }
}

@Component({
    selector: 'jhi-exam-generate-popup',
    template: ''
})
export class ExamGeneratePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private examPopupService: ExamPopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.examPopupService
                .open(ExamGenerateDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
