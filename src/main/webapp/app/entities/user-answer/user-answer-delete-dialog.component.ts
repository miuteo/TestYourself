import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserAnswer } from './user-answer.model';
import { UserAnswerPopupService } from './user-answer-popup.service';
import { UserAnswerService } from './user-answer.service';

@Component({
    selector: 'jhi-user-answer-delete-dialog',
    templateUrl: './user-answer-delete-dialog.component.html'
})
export class UserAnswerDeleteDialogComponent {

    userAnswer: UserAnswer;

    constructor(
        private userAnswerService: UserAnswerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAnswerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userAnswerListModification',
                content: 'Deleted an userAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-answer-delete-popup',
    template: ''
})
export class UserAnswerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerPopupService: UserAnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userAnswerPopupService
                .open(UserAnswerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
