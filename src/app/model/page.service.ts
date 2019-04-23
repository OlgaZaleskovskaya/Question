import { Injectable } from '@angular/core';
import { Subj } from './subj.model';
import { SubSubject } from './subSubject.model';
import { Topic } from './topic.model';


@Injectable()
export class PageService {
    private questionsOnPage: number;
    private _isLogin: boolean = false;
    currentSubject: Subj;
    currentSubSubject: SubSubject;
    currentTopic: Topic;
   tempo = {
       name: "vasya"
   }

    constructor() {
        this.questionsOnPage = 1;


    }
    getQuestionsOnPage(): number {
        return this.questionsOnPage;
    }

    setQuestionsOnPage(n: number): void {
        this.questionsOnPage = n;
    }

    get isLogin(): boolean {
        return this._isLogin;
    }

    set isLogin(p: boolean) {
        this._isLogin = p;
    }

   
}