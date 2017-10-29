import { BaseEntity } from './../../shared';

export const enum Variant {
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G'
}

export class Answer implements BaseEntity {
    constructor(
        public id?: number,
        public variant?: Variant,
        public isCorect?: boolean,
        public content?: string,
        public question?: BaseEntity,
    ) {
        this.isCorect = false;
    }
}
