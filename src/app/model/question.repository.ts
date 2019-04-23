import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { TempoDataSource } from './tempo.datasourse';
import { Subj } from './subj.model';
import { Observable, from, Subject } from 'rxjs';
import { Topic } from './topic.model';
import { of } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { SubSubject } from './subSubject.model';
import { HttpClient } from 'selenium-webdriver/http';
import { namespaceMathML } from '@angular/core/src/render3';
import { QuestionAnswer } from './QuestionAnswer.model';

@Injectable()
export class QuestionRepository {
    private questions: Question[];
    private subjects: Subj[];
    private subSubjects: SubSubject[];
    private topics: Topic[];
    getNumber: Subject<number>;
    token: string;
    subjectSubscribe = new Subject<Subj[]>();
    subSubSubscribe = new Subject<SubSubject[]>();
    topicSubscribe = new Subject<Topic[]>();


    constructor(private data: TempoDataSource
    ) {
        this.getNumber = new Subject<number>();
        this.subjects = [];
    }




    getSubjects() {
        this.data.getSubjects()
            .subscribe((response: Response) => {
                let arr = [];
                for (let k in response) {
                    const sub = new Subj(response[k].id, response[k].name);
                    arr.push(sub);
                }
                this.subjects = arr;
                this.subjectSubscribe.next(this.subjects);
            });
    }


    getTopics(subSubjectId: string): Observable<Topic[]> {
        return this.data.getTopics(subSubjectId)
            .pipe(tap(val => this.topics = val));;
    }


    getSubSubs(currentSubId: string) {
        return this.data.getSubSubs(currentSubId)
            .pipe(tap(val => this.subSubjects = val));
    }


    getQuestions(topicId: string): Observable<QuestionAnswer[]> {
        return this.data.getQuestions(topicId);
    }

    addSubject(subj: Subj, toDo: string): Observable<string> {
        switch (toDo) {
            case ("Edit"): {
                return this.data.editSubject(subj)
                    .pipe(tap(val => console.log("result = ", val)));
            }
                break;
            case ("Remove"): {
                return this.data.deleteSubject(subj)
                    .pipe(tap(val => console.log("result = ", val)));
            }
                break;
            case ("Add new subject"): {
                if (this.isInside<Subj>(subj.name, this.subjects)) {
                    return of('Alredy exists');
                } else {
                    return this.data.addSubject(subj.name)
                        .pipe(tap(val => console.log("result = ", val)));
                }
            }
                break;
        }
    }



    // saveSubjects() {
    //     return this.data.saveSubj()
    //         .pipe(
    //             tap(val => {
    //                 this.token = val['name'];
    //             }
    //             ));
    // }
    // saveSubSubs() {
    //     return this.data.saveSubSubs();

    // }

    private isInside<T>(name: string, arr: Array<T>): boolean {
        let res = false;
        arr.forEach(function (item, i, arr) {
            if (item['name'].toLowerCase() == name.toLowerCase()) {
                res = true;
            }
        })
        return res;
    }

    addSubSubject(subId: string, subSubject: SubSubject, toDo: string) {
        switch (toDo) {
            case ("edit"): {
                return this.data.editSubSubject(subId, subSubject)
                    .pipe(tap(val => console.log("result = ", val)));
            }
                break;
            case ("new"): {
                if (this.isInside<SubSubject>(subSubject.name, this.subSubjects)) {
                    return of('Alredy exists');
                } else {
                    return this.data.addSubSubject(subId, subSubject.name)
                        .pipe(tap(val => console.log("val = ", val)));
                }
                break;
            }
            case ("remove"): {
                return this.data.removeSubSubject(subId, subSubject)
                    .pipe(tap(val => console.log("result = ", val)));
            }
                break;

        }
    }

    addTopic(subSubId: string, topicName: string, currentTopic: Topic, toDo: string) {
        switch (toDo) {
            case ('new'): {
                if (this.isInside<Topic>(topicName, this.topics)) {
                    return of('Alredy exists');
                } else {
                    return this.data.addTopic(subSubId, topicName)
                        .pipe(tap(val => console.log("val = ", val)));
                }
            }
                break;
            case ('edit'): {
                return this.data.editTopic(currentTopic.id, topicName)
                    .pipe(tap(val => console.log("val = ", val)));
            }
                break;
            case ('remove'): {
                return this.data.removeTopic(currentTopic.id)
                    .pipe(tap(val => console.log("val = ", val)));
            }
                break;
        }
    }


    //to be removed
    saveTopics() {
        return this.data.saveTopics();
    }
    saveQuestions() {
        return this.data.saveQuestions();
    }

    addQuestion(q: QuestionAnswer, toDo: string): Observable<string> {
        console.log("repo on addQuestion");
        console.log(toDo);
        switch (toDo) {
            case ('add'): { return this.data.addQuestion(q); }
                break;
            case ('remove'): { return this.data.removeQuestion(q); }
                break;
            case ('edit'): { return this.data.editQuestion(q); }
                break;
        }
    }


}