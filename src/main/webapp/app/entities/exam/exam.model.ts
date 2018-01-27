import { BaseEntity, User } from './../../shared';

export class Exam implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public totalScore?: number,
        public created?: any,
        public lastModifiedDate?: any,
        public user?: User,
        public userAnswers?: BaseEntity[],
    ) {
    }
}
