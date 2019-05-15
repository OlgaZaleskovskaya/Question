export class Question {
    constructor(
        public id: string,
        public question: string,
        public answer?: [number,  string][],
        public code?: string,
        public ref?: string,

    ) { }

}
