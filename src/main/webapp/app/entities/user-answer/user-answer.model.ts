import { BaseEntity } from './../../shared';

export class UserAnswer implements BaseEntity {
    constructor(
        public id?: number,
        public question?: BaseEntity,
        public userVariants?: BaseEntity[],
    ) {
    }
}
