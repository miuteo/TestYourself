import { BaseEntity } from './../../shared';
import {Question} from '../question';

export class UserAnswer implements BaseEntity {
    constructor(
        public id?: number,
        public question?: Question,
        public userVariants?: BaseEntity[],
    ) {
    }
}
