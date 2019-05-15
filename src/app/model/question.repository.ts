import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { TempoDataSource } from './tempo.datasourse';
import { Subj } from './models/subj.model';
import { Observable, from, Subject, ObjectUnsubscribedError } from 'rxjs';
import { Topic } from './models/topic.model';
import { of } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { SubSubject } from './models/subSubject.model';
import { QuestionAnswer } from './models/QuestionAnswer.model';
import { PageService } from './models/page.service';

@Injectable()
export class QuestionRepository {
    private questions: Question[];
    private subjects: Subj[];
    private subSubjects: SubSubject[];
    private topics: Topic[];
    pages: number;

    getPageNumber: Subject<number>;
    token: string;
    subjectSubscribe = new Subject<Subj[]>();
    subSubSubscribe = new Subject<SubSubject[]>();
    topicSubscribe = new Subject<Topic[]>();


    constructor(private data: TempoDataSource, private pageService: PageService
    ) {
        this.getPageNumber = new Subject<number>();
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


    getQuestions(topicId: string, pageNumber: number, pageSize: number): Observable<QuestionAnswer[]> {
        return this.data.getQuestions(topicId, pageNumber, pageSize)
            .pipe(tap(val => this.getPageNumber.next(Math.ceil(val['amount'] / pageSize))),

                map(val => <QuestionAnswer[]>val['array']));
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

    addQuestion(q: QuestionAnswer, toDo: string, subjects:string[]): Observable<string> {
        switch (toDo) {
            case ('add'): {
                console.log("repo");
                return this.data.addQuestion(q); }
                break;
            case ('remove'): { return this.data.removeQuestion(q); }
                break;
            case ('edit' ||'answer' || 'like'): { return this.data.editQuestion(q, toDo); }
                break;
            case ('newTopic'): { return this.data.editQuestion(q, toDo); }
                break;
        }
    }


}