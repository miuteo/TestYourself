import { BaseEntity } from './../../shared';
import {Chapter} from "../chapter";
import {Answer} from "../answer";

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public content?: string,
        public explanation?: string,
        public chapter?: Chapter,
        public answerList?:Answer[],
    ) {
    }
}
