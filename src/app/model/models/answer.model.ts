export class Answer {
    like: number;
    unlike: number;
    message: string;
    date: number;
    author: string;
    isPublished: boolean;

    constructor(like: number,
        unlike: number,
        message: string,
        date: number,
        author: string,
        isPublished: boolean) {

        this.like = like
        this.unlike = unlike;
        this.message = message;
        this.date = date;
        this.author = author;
        this.isPublished = isPublished;
    }
}