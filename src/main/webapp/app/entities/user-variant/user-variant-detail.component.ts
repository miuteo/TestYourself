import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserVariant } from './user-variant.model';
import { UserVariantService } from './user-variant.service';

@Component({
    selector: 'jhi-user-variant-detail',
    templateUrl: './user-variant-detail.component.html'
})
export class UserVariantDetailComponent implements OnInit, OnDestroy {

    userVariant: UserVariant;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userVariantService: UserVariantService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserVariants();
    }

    load(id) {
        this.userVariantService.find(id).subscribe((userVariant) => {
            this.userVariant = userVariant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserVariants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userVariantListModification',
            (response) => this.load(this.userVariant.id)
        );
    }
}
