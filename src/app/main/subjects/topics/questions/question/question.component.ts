import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageService } from 'src/app/model/models/page.service';
import { QuestionAnswer } from 'src/app/model/models/QuestionAnswer.model';
import { QuestionRepository } from 'src/app/model/question.repository';
import { Answer } from 'src/app/model/models/answer.model';
import { AuthService } from 'src/app/model/services/auth.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],

})
export class QuestionComponent implements OnInit, OnChanges {
  item: [string, Answer[], number, string];
  answerIndex: number;
  @Input() question: QuestionAnswer;
  @Input() index: number;
  @Output() onNewAnswer = new EventEmitter<[QuestionAnswer, string]>();
  @Output() onRemoveQuestion = new EventEmitter<QuestionAnswer>();
  isOpen = false;
  isEdit = false;
  isAdd = false;
  message: string;
  newAnswer: string;


  constructor(public pageService: PageService, private authService: AuthService) {

  }

  ngOnInit() {
    this.item = [this.question.question, this.question.answer, this.question.lastVersion, this.question.author];
   console.log('this.item');
    console.log(this.item);
  }

  ngOnChanges() {
  }

  onSelect() {
    this.isOpen = !this.isOpen;
  }

  removeQuestion() {
    this.message = "Remove question from ";
    this.onRemoveQuestion.emit(this.question);


  }
  editQuestion() {
    this.message = "Edit question of ";
    this.isEdit = true;
  }

  onCancel() {
    this.isAdd = false;
  }
  // on edit. shoud be rewritten
  onSubmit(q: QuestionAnswer) {
    const obj: [QuestionAnswer, string] = [q, "edit"];
    //this.onEditQuestion.emit(obj);
    this.isEdit = false;
  }

  addAnswer() {
    this.isAdd = true;
  }

  onSubmitNewAnswer() {
    const date = new Date();
    const ans = new Answer(0, 0, this.newAnswer, Date.now(), this.authService.currentUser.name, false);
    this.question.answer.push(ans);
    const obj: [QuestionAnswer, string] = [this.question, "answer"];
    this.onNewAnswer.emit(obj);
    this.onCancel();

  }


  onAddLike(i: number) {
    this.question.answer[i]['like'] = this.question.answer[i]['like'] + 1;
    const obj: [QuestionAnswer, string] = [this.question, "like"];
    this.onNewAnswer.emit(obj);
    this.isOpen = true;

  }
  onAddUnLike(i: number) {
    this.question.answer[i]['unlike'] = this.question.answer[i]['unlike'] + 1;
    const obj: [QuestionAnswer, string] = [this.question, "unlike"];
    this.onNewAnswer.emit(obj);
    this.isOpen = true;

  }
}
