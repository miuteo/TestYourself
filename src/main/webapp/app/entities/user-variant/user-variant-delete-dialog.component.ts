import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserVariant } from './user-variant.model';
import { UserVariantPopupService } from './user-variant-popup.service';
import { UserVariantService } from './user-variant.service';

@Component({
    selector: 'jhi-user-variant-delete-dialog',
    templateUrl: './user-variant-delete-dialog.component.html'
})
export class UserVariantDeleteDialogComponent {

    userVariant: UserVariant;

    constructor(
        private userVariantService: UserVariantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userVariantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userVariantListModification',
                content: 'Deleted an userVariant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-variant-delete-popup',
    template: ''
})
export class UserVariantDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userVariantPopupService: UserVariantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userVariantPopupService
                .open(UserVariantDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
