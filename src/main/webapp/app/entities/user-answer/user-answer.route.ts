import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserAnswerComponent } from './user-answer.component';
import { UserAnswerDetailComponent } from './user-answer-detail.component';
import { UserAnswerPopupComponent } from './user-answer-dialog.component';
import { UserAnswerDeletePopupComponent } from './user-answer-delete-dialog.component';

export const userAnswerRoute: Routes = [
    {
        path: 'user-answer',
        component: UserAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-answer/:id',
        component: UserAnswerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAnswerPopupRoute: Routes = [
    {
        path: 'user-answer-new',
        component: UserAnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer/:id/edit',
        component: UserAnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer/:id/delete',
        component: UserAnswerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
