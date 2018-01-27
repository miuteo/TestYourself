import { BaseEntity } from './../../shared';

export const enum Variant {
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H'
}

export class UserVariant implements BaseEntity {
    constructor(
        public id?: number,
        public variant?: Variant,
    ) {
    }
}
