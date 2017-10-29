import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnswerComponent } from './answer.component';
import { AnswerDetailComponent } from './answer-detail.component';
import { AnswerPopupComponent } from './answer-dialog.component';
import { AnswerDeletePopupComponent } from './answer-delete-dialog.component';

export const answerRoute: Routes = [
    {
        path: 'answer',
        component: AnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'answer/:id',
        component: AnswerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'answer-new',
        component: AnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer/:id/edit',
        component: AnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer/:id/delete',
        component: AnswerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
