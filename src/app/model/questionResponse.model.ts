import { Question } from './question.model';

export class QuestionResponse {
    constructor(
        public quantity: number,
        public list: Question[]

    ) { }

}