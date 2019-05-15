import { Component, OnInit, Input, OnChanges, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionRepository } from 'src/app/model/question.repository';

import { Observable, Subject, Subscription, of } from 'rxjs';
import { PageService } from 'src/app/model/models/page.service';
import { QuestionAnswer } from 'src/app/model/models/QuestionAnswer.model';
import { Topic } from 'src/app/model/models/topic.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/model/services/auth.service';
import { Answer } from 'src/app/model/models/answer.model';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0}))
      ])
    ]),
  ],
})
export class QuestionsComponent implements
  OnChanges {
  questionList: QuestionAnswer[];
  @Input() currentTopicId: string;

  //  for creating new answer
  empty: QuestionAnswer;

  //  questions per page
  _pageSize: number;
  public selectedPageNumber: number;
  private pagesQuantity: number;

  pages: number[];
  pageNumbers: number;
  questionQuantity: number;
  sub: Subscription;

  //  to open modal window
  isOpened: boolean;
  message: string;
  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
  }

  constructor(private repo: QuestionRepository, public pageService: PageService, private authService: AuthService) {
    this.selectedPageNumber = 1;
    this.pages = [];
    this.sub = this.repo.getPageNumber.subscribe(response => {
      this.pages = [];
      for (let i = 1; i < response + 1; i++) {
        this.pages.push(i);
      }
    });
  }


  get currentSubjectName(): string {
    let name = this.pageService.currentSubject.name == undefined ? "subject" : this.pageService.currentSubject.name;
    return name;
  }

  get currentSubSubjectName(): string {
    let name = this.pageService.currentSubSubject.name == undefined ? "subSubject" : this.pageService.currentSubSubject.name;
    return name;
  }
  get currentTopicName(): string {
    let name = this.pageService.currentTopic.name == undefined ? "topic" : this.pageService.currentTopic.name;
    return name;
  }

  ngOnInit() {
    this.isOpened = false;
    this.pageSize = 3;
  }

  ngOnChanges() {
    this.selectedPageNumber = 1;
    this.getQuestions();
  }


  changePage(newPage: number) {
    this.selectedPageNumber = newPage;
    //  this.pageService.setPageNumber(newPage);
    this.getQuestions();
  }
  changePageSize(pageSize: number) {
    this.changePage(1);
    this.pageSize = Number(pageSize);
    this.getQuestions();
  }

  private getQuestions() {
    this.repo.getQuestions(this.currentTopicId, this.selectedPageNumber, this.pageSize)
      .subscribe(response =>
        this.questionList = response
      );
  }

  onChange(newQuestion: QuestionAnswer, toDo: string, newTopic?: string[]) {
    this.repo.addQuestion(newQuestion, toDo, newTopic)
      .subscribe(response => {
        switch (toDo) {
          case ('add'): {
            this.getQuestions();
          }
            break;
          case ('remove'): {
            this.getQuestions();
          }
            break;
          case ('edit'): {
            this.afterEditQuestion(newQuestion)
          }
            break;
          case ('like'): {
            this.afterEditQuestion(newQuestion)
          }
            break;
            case ('unlike'): {
              this.afterEditQuestion(newQuestion)
            }
              break;
          case ('answer'): {
            this.afterEditQuestion(newQuestion)
          }
            break;
        }
      }), error => console.log(error);
  }

  private afterEditQuestion(newQuestion: QuestionAnswer) {
    const num = newQuestion.id;
    let ind = 0;
    this.questionList.forEach(function (item, index, arr) {
      if (item.id == num) {
        ind = index;
      }
    });
    this.questionList.splice(ind, 1, newQuestion);
  }

  showModal() {
    const answer = new Answer(0,0,'',0, this.authService.currentUser.name, false);
    this.empty = new QuestionAnswer("",
     this.currentTopicId,
      "", 
      0, 
      this.authService.currentUser.name, [answer], );
    this.isOpened = true;
    this.message = "New question";
  }

  onCancel(smth: any) {
    this.isOpened = false;
  }

  onRemoveQuestion(question: QuestionAnswer) {
    this.onChange(question, 'remove');

  }

  onAddQuestion(question: [QuestionAnswer, string]) {
    if (question[1] == null) {
      this.onChange(question[0], "add");
    }
    this.isOpened = false;
  }

  onNewAnswer(item: [QuestionAnswer, string]) {
 
    let toDo = "add";
    if (item[1]) {
      toDo = "newTopic";
    }
    this.onChange(item[0], item[1]);
  }


}
