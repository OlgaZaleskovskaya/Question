import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageService } from 'src/app/model/page.service';
import { QuestionAnswer } from 'src/app/model/QuestionAnswer.model';
import { Question } from 'src/app/model/question.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '150px',
        opacity: 1,
        backgroundColor: 'rgb(248, 249, 250)'
      })),
      state('closed', style({
        height: '5px',
        opacity: 1,
        backgroundColor: 'rgb(52, 64, 94)'
      })),
      transition('* => *', [
        animate('1s')
      ]),

    ]),
  ],
})
export class QuestionComponent implements OnInit, OnChanges {
  item: [string, string];
  @Input() question: QuestionAnswer;
  @Input() index: number;
  @Output() onEditQuestion = new EventEmitter<QuestionAnswer>();
  @Output() onRemoveQuestion = new EventEmitter<QuestionAnswer>();

  isOpen = false;
  isEdit = false;
  message: string;


  constructor(private pageService: PageService) {

  }

  ngOnInit() {
    this.item = [this.question.question, this.question.answer];
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
    this.isEdit = false;
  }

  onSubmit(q: QuestionAnswer) {
    this.onEditQuestion.emit(q);
    this.isEdit = false;

  }
}
