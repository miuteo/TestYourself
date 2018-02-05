import { BaseEntity } from './../../shared';
import {Variant} from "../answer";



export class UserVariant implements BaseEntity {
    constructor(
        public id?: number,
        public variant?: Variant,
        public userAnswer?: number
    ) {
    }
}
