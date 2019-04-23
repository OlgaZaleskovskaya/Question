import { Injectable } from '@angular/core';
import { QuestionLong } from './QuestionLong.model';
import { Observable, from, Subject, of, fromEvent, iif } from "rxjs";
import { Topic } from './topic.model';
import { TopicsComponent } from '../main/subjects/topics/topics.component';
import { Subj } from './subj.model';
import { Question } from './question.model';
import { QuestionResponse } from './questionResponse.model';
import { SubSubject } from './subSubject.model';

import { HttpClient } from '@angular/common/http';
import { map, filter, tap, take, toArray, mapTo, mergeMap, concatMap, defaultIfEmpty } from 'rxjs/operators';
import { validateStyleParams } from '@angular/animations/browser/src/util';
import { QuestionAnswer } from './QuestionAnswer.model';

@Injectable()
export class TempoDataSource {
    private subjects: Subj[];
    private subjects1: Subj[];
    private questionList: QuestionAnswer[];
    private subSubjects: SubSubject[];
    private subSubjects1: SubSubject[];
    private subSubjects2: SubSubject[];
    private subSubjects3: SubSubject[];
    private subSubs: SubSubject[];
    private topics: Topic[];
    private topics1: Topic[];
    private topics2: Topic[];
    private topics3: Topic[];
    private topics4: Topic[];
    private topics5: Topic[];
    private topics6: Topic[];
    private topics7: Topic[];
    private topics8: Topic[];
    private topics9: Topic[];
    private smth: Observable<any>;

    private questionLong: QuestionLong[];
    url = "https://questionary-d6795.firebaseio.com/";
    constructor(private http: HttpClient
    ) {
        this.subjects = [];

    };

    getQuestions1(subjectId: string,
        subSubjectId: string,
        topicId: string,
        pageNumber: number,
        pageSize: number):
        Observable<QuestionResponse> {
        let tempo = this.questionLong
            .filter((item, index, array) => item.subject == subjectId
                && item.subSubject == subSubjectId && item.topic == topicId)
            .map(item => new Question(item.id, item.question, item.answer));
        let res = tempo.filter((item, index, array) => index >= (pageNumber - 1) * pageSize
            && index < pageNumber * pageSize);
        const quantity = tempo.length;
        let result = new QuestionResponse(quantity, res);
        return from([result]);
    }


    getQuestions(topicId: string): Observable<QuestionAnswer[]> {
        let obs = this.http.get("https://questionary-d6795.firebaseio.com/questions.json");
        return obs.pipe(
            tap(val => this.questionList = <Array<QuestionAnswer>>val),
            mergeMap(val => from(<Array<QuestionAnswer>>val)),
            filter(val => val['topicId'] == topicId),
            toArray(),
            mergeMap(val => iif(() => val.length == 0, of([new QuestionAnswer("n/a", "n/a", "n/a")]), of(val))));

    }



    // ------------mapulation with subjects------------------
    getSubjects() {
        return this.http.get("https://questionary-d6795.firebaseio.com/subjects.json")
            .pipe(tap(v => {
                this.subjects = <Array<Subj>>v;

            }));
    }
    addSubject(name: string): Observable<string> {
        const id = "s_" + name.toLowerCase();
        const newSubj = new Subj(id, name.toLowerCase());
        this.subjects.push(newSubj);
        return this.http.put("https://questionary-d6795.firebaseio.com/subjects.json", this.subjects)
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

    // method to be removed 
    saveTopics() {
        return this.http.put("https://questionary-d6795.firebaseio.com/topics.json", this.topics);
    }

    // method to be removed 
    saveQuestions() {
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList);
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

    addQuestion(q: QuestionAnswer): Observable<string> {
        let id = "";
        q.id = this.createId(q.topicId);
        this.questionList.push(q);
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => 'added'));

    }

    removeQuestion(q: QuestionAnswer): Observable<string> {
        console.log("on remove question");
        this.onRemoveQuestion(q);
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => "removed"));

    }

    editQuestion(q: QuestionAnswer): Observable<string> {
        console.log("on add question");
        this.replaceQuestion(q);
        return this.http.put("https://questionary-d6795.firebaseio.com/questions.json", this.questionList)
            .pipe(map(v => "changed"));

    }



    private onRemoveQuestion(q: QuestionAnswer) {
        const index = this.questionList.indexOf(q);
        console.log(index);
        this.questionList.splice(index, 1);
    }

    private createId(topicId: string): string {
        let id = "q1";
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
        return id;
    }

    private replaceQuestion(q: QuestionAnswer) {
        const index = this.questionList.indexOf(q);
        this.questionList.splice(index, 1, q);

    }



}




