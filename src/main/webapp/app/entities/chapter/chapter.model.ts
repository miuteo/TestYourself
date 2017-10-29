import { BaseEntity } from './../../shared';

export class Chapter implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public book?: BaseEntity,
    ) {
    }
}
