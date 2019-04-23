import { Component, OnInit, Input, OnChanges, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionRepository } from 'src/app/model/question.repository';
import { resetComponentState } from '@angular/core/src/render3/state';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { PageService } from 'src/app/model/page.service';
import { QuestionAnswer } from 'src/app/model/QuestionAnswer.model';
import { Topic } from 'src/app/model/topic.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
questionList: Observable<QuestionAnswer[]>;

  //  for creating new answer
  empty: QuestionAnswer;
  _pageSize: number;
  public selectedPageNumber: number;
  private pagesQuantity: number;
  @Input() currentTopicId: string;
  pages: number[];
  sub: Subscription;
  //  to open modal window
  isOpened: boolean;
  message: string;


  constructor(private repo: QuestionRepository, private pageService: PageService) {
    this.selectedPageNumber = 1;
  }
  ngOnInit() {
    this.isOpened = false;
  }

  public set pageSize(ps: number) {
    this._pageSize = ps;
    this.pageService.setQuestionsOnPage(ps);
    this.changePage(1);
  }

  public get pageSize() {
    this._pageSize = this.pageService.getQuestionsOnPage();
    return this._pageSize;
  }


  ngOnChanges() {
    this.selectedPageNumber = 1;
    this.getQuestions();
  }

  changePage(newPage: number) {
    this.selectedPageNumber = newPage;
    // this.getQuestions();
  }

  private createPages(pages: number): number[] {
    const res = [];
    for (let i = 1; i < pages + 1; i++) {
      res.push(i);
    }
    return res;
  }

  private getQuestions() {
    this.questionList = this.repo.getQuestions(this.pageService.currentTopic.id);
  }

  onChange(newQuestion: QuestionAnswer, toDo: string) {
    this.repo.addQuestion(newQuestion, toDo)
      .subscribe(response => {
        alert(response);
        this.getQuestions();
      }), error => console.log(error);
  }

  showModal() {
    this.empty = new QuestionAnswer("", this.pageService.currentTopic.id, "", "");
    this.isOpened = true;
    this.message = "New question";
  }

  onCancel(smth: any) {
    this.isOpened = false;
  }

  onRemoveQuestion(question: QuestionAnswer) {
    this.onChange(question, 'remove');

  }
  onSubmit(question: QuestionAnswer) {
    this.onChange(question, 'add');
    this.isOpened = false;
  }

  onEditQuestion(q: QuestionAnswer, edit) {
    this.repo.addQuestion(q, 'edit')
      .subscribe(response => {
        alert(response);
        this.getQuestions();
      }), error => console.log(error);
  }


}
