import {Component, OnInit} from '@angular/core';
import {Exam} from './exam.model';
import {ExamService} from './exam.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {UserAnswer} from '../user-answer';
import {Answer} from '../answer';

@Component({
    selector : 'jhi-exam-resolve',
    templateUrl: './exam-resolve.component.html'
})
export class ExamResolveComponent implements OnInit {
    exam: Exam;
    currentUserAnswer: UserAnswer;
    private subscription: Subscription;

    constructor(
        private examService: ExamService,
        private route: ActivatedRoute
    ) {

    }
    ngOnInit() {
        this.subscription = this.route.params.subscribe( (params) => {
           this.load(params['id']);
        });
    }

    load(id) {
        this.examService.find(id).subscribe( (exam) => {
            this.exam = exam;
            this.currentUserAnswer = this.exam.userAnswers[0];

            console.log(this.exam);
        });

    }
    nextQuestion() {
        var index: number;
        index = this.exam.userAnswers.indexOf(this.currentUserAnswer) + 1;
        if(index>this.exam.userAnswers.length){
            index=0;
        }
        this.currentUserAnswer  = this.exam.userAnswers[index];
    }
    negateIsCorect(answer: Answer){
        answer.isCorect = !answer.isCorect;
    }
}
