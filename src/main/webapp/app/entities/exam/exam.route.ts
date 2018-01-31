import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ExamComponent } from './exam.component';
import { ExamDetailComponent } from './exam-detail.component';
import { ExamPopupComponent } from './exam-dialog.component';
import { ExamDeletePopupComponent } from './exam-delete-dialog.component';
import {ExamGenerateDialogComponent, ExamGeneratePopupComponent} from './exam-generate-dialog.component';
import {ExamResolveComponent} from './exam-resolve.component';

export const examRoute: Routes = [
    {
        path: 'exam',
        component: ExamComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'exam/:id',
        component: ExamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exam-resolve/:id',
        component: ExamResolveComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exam'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const examPopupRoute: Routes = [
    {
        path: 'exam-new',
        component: ExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exam/:id/edit',
        component: ExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exam/:id/delete',
        component: ExamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exam-generate',
        component: ExamGeneratePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
