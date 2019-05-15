import { Injectable } from '@angular/core';

import { Observable, from, Subject, of, fromEvent, iif } from "rxjs";
import { Topic } from './models/topic.model';
import { TopicsComponent } from '../main/subjects/topics/topics.component';
import { Subj } from './models/subj.model';
import { Question } from './question.model';
import { QuestionResponse } from './questionResponse.model';
import { SubSubject } from './models/subSubject.model';

import { HttpClient } from '@angular/common/http';
import { map, filter, tap, take, toArray, mapTo, mergeMap, concatMap, defaultIfEmpty } from 'rxjs/operators';
import { QuestionAnswer } from './models/QuestionAnswer.model';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Message } from './models/message.model';

@Injectable()
export class TempoDataSource {
    private subjects: Subj[];
    private subjects1: Subj[];
    private questionList: QuestionAnswer[];
    private subSubs: SubSubject[];
    private topics: Topic[];
    private users: User[];
    private messageList: Message[];

    private smth: Observable<any>;


    url = "https://questionary-d6795.firebaseio.com/";
    constructor(private http: HttpClient, private authSevice: AuthService
    ) {
        this.subjects = [];
        this.questionList = <Array<QuestionAnswer>>[];


    };



    getQuestions(topicId: string, pageNumber: number, pageSize: number): Observable<Object> {
        let obs = this.http.get("https://questionary-d6795.firebaseio.com/questions.json");
        const emptyArray = from(<Array<QuestionAnswer>>[]);
console.log("get questions on init");
        return obs.pipe(
            //  mergeMap((val => iif(() => val == null, emptyArray, of(<Array<QuestionAnswer>>val) )))),
            tap(
           val => this.questionList = <Array<QuestionAnswer>>val
               
            ),
            mergeMap(val => {
                if (val) { return from(<Array<QuestionAnswer>>val) }
                else {
                    return emptyArray
                }
            }
            ),
            filter(val => val['topicId'] == topicId),
            toArray(),
            map(val => ({
                'amount': val.length, "array": val.filter(function (item, index, arr) {
                    return index >= (pageNumber - 1) * pageSize
                        && index < pageNumber * pageSize;
                }
                )
            }
            )),
        );

        // mergeMap(val => iif(() => val.length == 0,
        //     of([new QuestionAnswer("n/a", "n/a", "n/a")]), of(val))));
    }



    // ------------mapulation with subjects------------------
    getSubjects() {
        return this.http.get("https://questionary-d6795.firebaseio.com/subjects.json")
            .pipe(tap(v => {
                this.subjects = <Array<Subj>>v;

            }));
    }
    addSubject(name: string): Observable<string> {
        const token = this.authSevice.getToken();
        const id = "s_" + name.toLowerCase();
        const newSubj = new Subj(id, name.toLowerCase());
        this.subjects.push(newSubj);
        return this.http.put("https://questionary-d6795.firebaseio.com/subjects.json?auth=" + token, this.subjects)
            .pipe(map(val => "add"));
    }
    // ------------to be removed--------------
    pushSubj() {
        let tempo: { id: string, name: string }[] = [
            { "id": "s_java", "name": "java" },
        ];
        return this.http.put("https://questionary-d6795.firebaseio.com/subjects.json", tempo);
    }
    // -------end --------------

    editSubject(subj: Subj): Observable<string> {
        let index: number = this.getSubjIndex(subj);
        let newSubj = {
            id: subj.id,
            name: subj.name.toLowerCase()
        };
        let tempo = [];
        tempo.push(newSubj);
        this.subjects.splice(index, 1, newSubj);
        return this.http.put("https://questionary-d6795.firebaseio.com/subjects.json", this.subjects)
            .pipe(map(val => "has been chaged"));
    }

    deleteSubject(subj: Subj): Observable<string> {
        let index: number = this.getSubjIndex(subj);
        this.subjects.splice(index, 1);
        return this.http.put("https://questionary-d6795.firebaseio.com/subjects.json", this.subjects)
            .pipe(map(val => "has been chaged"));
    }


    private getSubjIndex(subj: Subj): number {
        let index: number;
        this.subjects.forEach(function (item, i, arr) {
            if (item.id == subj.id) {
                index = i
            }

        });
        return index;
    }
    // -----------end -mapulation with subjects------------------



    // ------------mapulation with subSubjects------------------
    saveSubSubs() {
        return this.http.put("https://questionary-d6795.firebaseio.com/subSubjects.json", this.subSubs);
    }


    getSubSubs(subId: string): Observable<any> {
        let obs = this.http.get("https://questionary-d6795.firebaseio.com/subSubjects.json");
        return obs.pipe(
            tap(v => this.subSubs = <Array<SubSubject>>v),
            mergeMap(val => from(<Array<SubSubject>>val)),
            filter(val => val['subId'] == subId),
            toArray(),
            mergeMap(v => iif(() => v.length == 0, of([new Subj("n/a", "no subsubs")]), of(v))));
    }


    addSubSubject(subId: string, subSubName: string): Observable<string> {
        const id = subId + "-" + subSubName.toLowerCase();
        this.subSubs.push(new SubSubject(id, subId, subSubName.toLowerCase()));
        return this.http.put("https://questionary-d6795.firebaseio.com/subSubjects.json", this.subSubs)
            .pipe(map(val => "done"));
    }

    editSubSubject(subId: String, subSubject: SubSubject): Observable<string> {
        let i: number;
        this.subSubs.forEach(function (item, index, arr) {
            if (item.id == subSubject.id) { i = index; }
        });
        this.subSubs.splice(i, 1, subSubject);

        return this.http.put("https://questionary-d6795.firebaseio.com/subSubjects.json", this.subSubs)
            .pipe(map(val => val = "done"));

    }

    removeSubSubject(subId: String, subSubject: SubSubject): Observable<string> {
        const i = this.subSubs.indexOf(subSubject);
        this.subSubs.splice(i, 1);
        return this.http.put("https://questionary-d6795.firebaseio.com/subSubjects.json", this.subSubs)
            .pipe(map(val => val = "removed"));

    }
    // ---------end of mapulation with subSubjects------------------

    // ------------mapulation with topics------------------
    addTopic(subSubId: string, topicName: string): Observable<string> {
        const id = subSubId + "-" + topicName.toLowerCase();
        this.topics.push(new Topic(id, subSubId, topicName.toLowerCase()));
        return this.http.put("https://questionary-d6795.firebaseio.com/topics.json", this.topics)
            .pipe(map(val => val = id));
    }

    editTopic(id: string, name: string): Observable<string> {
        let index: number;
        this.topics.forEach(function (item, index, arr) {
            if (item.id == id) {
                item.name = name;
            }
        })
        return this.http.put("https://questionary-d6795.firebaseio.com/topics.json", this.topics)
            .pipe(map(val => val = id));
    }

    removeTopic(id: string): Observable<string> {
        let index: number;
        this.topics.forEach(function (item, i, arr) {
            if (item.id == id) {
                index = i;
            }
        });
        this.topics.splice(index, 1);
        return this.http.put("https://questionary-d6795.firebaseio.com/topics.json", this.topics)
            .pipe(map(val => val = id));
    }
    getTopics(subSubId: string): Observable<any> {
        let obs = this.http.get("https://questionary-d6795.firebaseio.com/topics.json");
        return obs.pipe(
            tap(v => this.topics = <Array<Topic>>v),
            mergeMap(val => from(<Array<Topic>>val)),
            filter(val => val['subSubjectId'] == subSubId),
            toArray(),
            mergeMap(v => iif(() => v.length == 0, of([new Topic("n/a", "n/a", "no topics")]), of(v))));
    }

    // --------end of mapulation with topics------------------


    // method to be removed 
    saveTopics() {
        return this.http.put("https://questionary-d6795.firebaseio.com/topics.json", this.topics);
    }

    // method to be removed 
    saveQuestions() {
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList);
    }




    addQuestion(q: QuestionAnswer): Observable<string> {
        let id = "";
        q.id = this.createId(q.topicId);
        if (this.questionList) {
            this.questionList.push(q);
        } else {
            this.questionList = [];
            this.questionList.push(q);
        }

        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => id));

    }

    removeQuestion(q: QuestionAnswer): Observable<string> {
        console.log("on remove question");
        this.onRemoveQuestion(q);
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => "removed"));

    }

    editQuestion(q: QuestionAnswer, toDo: string): Observable<string> {
        this.replaceQuestion(q);
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => toDo));

    }



    private onRemoveQuestion(q: QuestionAnswer) {
        const index = this.questionList.indexOf(q);
        this.questionList.splice(index, 1);
    }

    private createId(topicId: string): string {
        let id = "q1";
        if (this.questionList) {
            const newList = this.questionList.filter(function (item, index, array) {
                return item.topicId == topicId;
            });
            if (newList.length > 0) {
                let idArr = [];
                newList.forEach(item => idArr.push(Number(item.id.substring(1))));
                let max = idArr.reduce(function (a, b) {
                    return Math.max(a, b) + 1;
                });
                id = "q" + max;
            }
        }
        return id;
    }

    private replaceQuestion(q: QuestionAnswer) {
        const index = this.questionList.indexOf(q);
        this.questionList.splice(index, 1, q);

    }

    sendMessage(message: Message): Observable<string> {
        if (this.messageList) {
            this.messageList.push(message);
        } else {
            this.messageList = [];
            this.messageList.push(message);
        }
        return this.http.put("https://questionary-d6795.firebaseio.com/messages.json", this.messageList)
            .pipe(map(val => "done"));
    }
    // for admin
    getMessages(user: User) {
        let obs = this.http.get("https://questionary-d6795.firebaseio.com/messages.json");
        const emptyArray = from(<Array<Message>>[]);
        return obs.pipe(
            tap(val => {
                this.messageList = <Array<Message>>val
                console.log("get array");
                console.log(this.messageList);
            }
            ),
            mergeMap(val => {
                if (val) { return from(<Array<Message>>val) }
                else {
                    return emptyArray
                }
            }
            ),
            filter(val => val['_reciever'] == 'admin'),
            toArray(),

        );

        // mergeMap(val => iif(() => val.length == 0,
        //     of([new QuestionAnswer("n/a", "n/a", "n/a")]), of(val))));

    }



}




