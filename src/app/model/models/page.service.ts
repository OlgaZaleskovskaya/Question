import { Injectable } from '@angular/core';
import { Subj } from './subj.model';
import { SubSubject } from './subSubject.model';
import { Topic } from './topic.model';


@Injectable()
export class PageService {
    private _isLogin: boolean = false;
    private _isAdmin:  boolean = false;
    public currentSubject: Subj;
    public currentSubSubject: SubSubject;
    public currentTopic: Topic;
   
  tempo = "vasya";
    constructor() {
        
    }


    get isLogin(): boolean {
        return this._isLogin;
    }

    set isLogin(p: boolean) {
        this._isLogin = p;
    }
    get isAdmin(): boolean {
        return this._isAdmin;
    }

    set isAdmin(p: boolean) {
        this._isAdmin = p;
    }


   
}