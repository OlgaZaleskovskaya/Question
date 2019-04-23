export class QuestionAnswer {
    constructor(
        public id: string,
        public topicId: string,
        public question: string,
        public answer?: string,
        public code?: string,
        public ref?: string,

    ) { }

}
