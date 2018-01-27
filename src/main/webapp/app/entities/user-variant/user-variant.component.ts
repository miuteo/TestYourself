import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { UserVariant } from './user-variant.model';
import { UserVariantService } from './user-variant.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-user-variant',
    templateUrl: './user-variant.component.html'
})
export class UserVariantComponent implements OnInit, OnDestroy {
userVariants: UserVariant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userVariantService: UserVariantService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userVariantService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userVariants = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserVariants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserVariant) {
        return item.id;
    }
    registerChangeInUserVariants() {
        this.eventSubscriber = this.eventManager.subscribe('userVariantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
