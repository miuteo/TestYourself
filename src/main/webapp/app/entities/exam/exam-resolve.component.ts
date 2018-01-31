import {Component, OnInit} from "@angular/core";
import {Exam} from "./exam.model";
import {ExamService} from "./exam.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
    selector : 'jhi-exam-resolve',
    templateUrl: './exam-resolve.component.html'
})
export class ExamResolveComponent implements OnInit{
    exam: Exam;
    private subscription: Subscription;

    constructor(
        private examService: ExamService,
        private route : ActivatedRoute
    ){

    }
    ngOnInit(){
        this.subscription = this.route.params.subscribe( (params) =>{
           this.load(params['id']);
        });


    }

    load(id){
        this.examService.find(id).subscribe( (exam) =>{
            this.exam = exam;
        });
        console.log(this.exam);
    }
}
