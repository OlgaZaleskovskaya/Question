export class QuestionLong {
constructor(
    public id: string,
    public subject: string,
    public subSubject: string,
    public topic: string,
    public question: string,
    public answer?: string,
    public code?: string,
    public ref?: string
){}

}