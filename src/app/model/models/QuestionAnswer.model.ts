import { Answer } from './answer.model';

export class QuestionAnswer {
    constructor(
      
        public id: string,
        public topicId: string,
        public question: string,
        public lastVersion: number,
     public author: string,
        // -> [likes, unlikes, questionBody, dateOfCreating, isPiblished, author]
        public answer?: Answer[],
        public code?: string,
        public ref?: string,


    ) { }

}
