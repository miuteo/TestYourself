import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChapterComponent } from './chapter.component';
import { ChapterDetailComponent } from './chapter-detail.component';
import { ChapterPopupComponent } from './chapter-dialog.component';
import { ChapterDeletePopupComponent } from './chapter-delete-dialog.component';

@Injectable()
export class ChapterResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const chapterRoute: Routes = [
    {
        path: 'chapter',
        component: ChapterComponent,
        resolve: {
            'pagingParams': ChapterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chapter/:id',
        component: ChapterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chapterPopupRoute: Routes = [
    {
        path: 'chapter-new',
        component: ChapterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chapter/:id/edit',
        component: ChapterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chapter/:id/delete',
        component: ChapterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chapters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
