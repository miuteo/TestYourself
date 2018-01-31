import { BaseEntity, User } from './../../shared';
import {UserAnswer} from '../user-answer/user-answer.model';

export class Exam implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public totalScore?: number,
        public created?: any,
        public lastModifiedDate?: any,
        public user?: User,
        public userAnswers?: UserAnswer[],
    ) {
    }
}
