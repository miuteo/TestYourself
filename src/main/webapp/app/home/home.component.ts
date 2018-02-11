import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {ExamService} from '../entities/exam';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    havePendingExam: boolean;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private examService: ExamService
    ) {
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.account = account;
            console.log( `atribuire this account` );
            if ( this.isAuthenticated() ) {
                this.examService.countPendingExam().subscribe((result) => {
                    if (result > 0) {
                        this.havePendingExam = true;
                    }
                    console.log(`havePendingExam=${this.havePendingExam}`);
                })
            }
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
