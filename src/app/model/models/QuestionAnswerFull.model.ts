import { QuestionAnswer } from './QuestionAnswer.model';
import { Answer } from './answer.model';

export class QuestionAnswerFull extends QuestionAnswer {
    subject: string;
    subSubject: string;
    topic: string;
    published: boolean;
    constructor(subject: string,
        subSubject: string,
        topic: string,
        published: boolean,
        id: string,
        topicId: string,
        question: string,
        lastVersion: number,
        author: string,
        answer: Answer[],
        code?: string,
        ref?: string,
    ) {
        super(id,
            topicId,
            question,
            lastVersion,
            author,
            answer,
           );
        this.subSubject = subSubject;
        this.subject = subject;
        this.topic = topic;
        this.published = published;

    }

}