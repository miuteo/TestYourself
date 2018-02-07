import {Component, OnInit} from '@angular/core';
import {Exam} from './exam.model';
import {ExamService} from './exam.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {UserAnswer} from '../user-answer';
import {Answer} from '../answer';
import {Variant} from '../answer';
import {UserVariantService} from '../user-variant/user-variant.service';
import {UserVariant} from '../user-variant';

@Component({
    selector : 'jhi-exam-resolve',
    templateUrl: './exam-resolve.component.html'
})
export class ExamResolveComponent implements OnInit {
    exam: Exam;
    currentUserAnswer: UserAnswer;
    private subscription: Subscription;
    currentAnswers: Map<number, Variant>;
    isAnswerSelected: boolean;
    isAlreadyAnswered: Set<number>;
    isLoading: boolean;

    constructor(
        private examService: ExamService,
        private route: ActivatedRoute,
        private userVariantService: UserVariantService
    ) {
        this.currentAnswers = new Map();
        this.isAlreadyAnswered = new Set();
        this.isLoading = true;
    }
    ngOnInit() {
        this.subscription = this.route.params
            .subscribe( (params) => {
           this.load();
        });
    }

    load() {
        this.examService.findLastExam()
            .subscribe( (exam) => {
            this.exam = exam;
            this.currentUserAnswer = this.exam.userAnswers[0];
        });

    }
    nextQuestion() {
        this.isAnswerSelected = false;
        let index: number;
        this.isAlreadyAnswered.add(this.currentUserAnswer.id);
        if (this.isAlreadyAnswered.size === this.exam.userAnswers.length) {
            return;
        }
        index = this.exam.userAnswers.indexOf(this.currentUserAnswer) + 1;
        if (index >= this.exam.userAnswers.length) {
            index = 0;
        }
        this.currentUserAnswer  = this.exam.userAnswers[index];
        this.isAnswerSelected = this.isAnyAnswerSelected();
    }
    sendAnswer() {
        const userVariantArray: UserVariant[] = new Array();
        this.currentAnswers.forEach((value) => {
           userVariantArray.push(new UserVariant(null, value, this.currentUserAnswer.id));
        });

        this.userVariantService.createBulk(userVariantArray)
            .subscribe((params) => {

            });
        this.currentAnswers.clear();
        this.isAnswerSelected = false;
        let index: number;
        this.isAlreadyAnswered.add(this.currentUserAnswer.id);
        if (this.isAlreadyAnswered.size === this.exam.userAnswers.length) {
            return;
        }
        index = this.exam.userAnswers.indexOf(this.currentUserAnswer) + 1;
        if (index >= this.exam.userAnswers.length) {
            index = 0;
        }
        this.currentUserAnswer  = this.exam.userAnswers[index];
        this.isAnswerSelected = this.isAnyAnswerSelected();
    }
    negateIsCorect(answer: Answer) {

        if (this.currentAnswers.has(answer.id)) {
            this.currentAnswers.delete(answer.id);
            this.isAnswerSelected = this.isAnyAnswerSelected();
        } else {
            this.isAnswerSelected = true;
            this.currentAnswers.set(answer.id, answer.variant);
        }
        console.log(this.currentAnswers);
    }
    answerIsPresent(idQustion: number, variant: Variant): boolean {
            if (this.currentAnswers.has(idQustion)) {
                return true;
            }

            return false;
    }
    isAnyAnswerSelected(): boolean {
        for (const answer of this.currentUserAnswer.question.answerList){
            if (this.currentAnswers.has(answer.id)) {
                return true;
            }
        }
        return false;
    }
}
