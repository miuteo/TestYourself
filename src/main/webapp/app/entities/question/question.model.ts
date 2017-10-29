import { BaseEntity } from './../../shared';

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public content?: string,
        public explanation?: string,
        public chapter?: BaseEntity,
    ) {
    }
}
