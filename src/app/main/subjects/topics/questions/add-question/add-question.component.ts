import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Topic } from 'src/app/model/models/topic.model';
import { Question } from 'src/app/model/question.model';
import { QuestionAnswer } from 'src/app/model/models/QuestionAnswer.model';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'], 
 
})
export class AddQuestionComponent implements OnInit {

  @Input() question: QuestionAnswer;
  @Output() onAddQuestion = new EventEmitter<[QuestionAnswer, string[]]>();
  @Output() onCancel = new EventEmitter<string>();
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  questionQuestion: string;
  answer: string;
  newSubj: string;
  newSubjSubj: string;
  newTopic: string;


  ngOnInit() {
    this.questionQuestion = this.question.question;
    this.answer = this.question.answer[0][2];
    this.newSubj = null;
    this.newSubjSubj = null;
    this.newTopic = null;
  }

  onSubmit(form: NgForm) {
    // for adding new topic
    let newCategory: string[]; 
    if (this.newSubj || this.newSubjSubj || this.newTopic) {
     newCategory =[ this.newSubj,  this.newSubjSubj, this.newTopic] ;
    } 
    let date = new Date();
    this.question.question = this.questionQuestion;
    this.question.answer[0]['message'] = this.answer;
    this.question.answer[0]['date'] = date.getTime();
    this.question.lastVersion = date.getTime();
    this.onAddQuestion.emit([this.question, newCategory]);
    this.cancel();

  }

  cancel() {
    this.onCancel.emit(null);
  }

  toAnotherTopic() {

    console.log("hi-hi");
  }


}
