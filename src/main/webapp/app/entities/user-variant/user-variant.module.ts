import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestYourselfSharedModule } from '../../shared';
import {
    UserVariantService,
    UserVariantPopupService,
    UserVariantComponent,
    UserVariantDetailComponent,
    UserVariantDialogComponent,
    UserVariantPopupComponent,
    UserVariantDeletePopupComponent,
    UserVariantDeleteDialogComponent,
    userVariantRoute,
    userVariantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userVariantRoute,
    ...userVariantPopupRoute,
];

@NgModule({
    imports: [
        TestYourselfSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserVariantComponent,
        UserVariantDetailComponent,
        UserVariantDialogComponent,
        UserVariantDeleteDialogComponent,
        UserVariantPopupComponent,
        UserVariantDeletePopupComponent,
    ],
    entryComponents: [
        UserVariantComponent,
        UserVariantDialogComponent,
        UserVariantPopupComponent,
        UserVariantDeleteDialogComponent,
        UserVariantDeletePopupComponent,
    ],
    providers: [
        UserVariantService,
        UserVariantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestYourselfUserVariantModule {}
