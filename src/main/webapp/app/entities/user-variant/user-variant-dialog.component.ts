import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserVariant } from './user-variant.model';
import { UserVariantPopupService } from './user-variant-popup.service';
import { UserVariantService } from './user-variant.service';

@Component({
    selector: 'jhi-user-variant-dialog',
    templateUrl: './user-variant-dialog.component.html'
})
export class UserVariantDialogComponent implements OnInit {

    userVariant: UserVariant;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private userVariantService: UserVariantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userVariant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userVariantService.update(this.userVariant));
        } else {
            this.subscribeToSaveResponse(
                this.userVariantService.create(this.userVariant));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserVariant>) {
        result.subscribe((res: UserVariant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserVariant) {
        this.eventManager.broadcast({ name: 'userVariantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-user-variant-popup',
    template: ''
})
export class UserVariantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userVariantPopupService: UserVariantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userVariantPopupService
                    .open(UserVariantDialogComponent as Component, params['id']);
            } else {
                this.userVariantPopupService
                    .open(UserVariantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
