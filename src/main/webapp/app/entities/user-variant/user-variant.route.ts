import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserVariantComponent } from './user-variant.component';
import { UserVariantDetailComponent } from './user-variant-detail.component';
import { UserVariantPopupComponent } from './user-variant-dialog.component';
import { UserVariantDeletePopupComponent } from './user-variant-delete-dialog.component';

export const userVariantRoute: Routes = [
    {
        path: 'user-variant',
        component: UserVariantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserVariants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-variant/:id',
        component: UserVariantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserVariants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userVariantPopupRoute: Routes = [
    {
        path: 'user-variant-new',
        component: UserVariantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserVariants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-variant/:id/edit',
        component: UserVariantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserVariants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-variant/:id/delete',
        component: UserVariantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserVariants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
