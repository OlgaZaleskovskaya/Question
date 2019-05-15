import { Component, OnInit, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { Message } from 'src/app/model/models/message.model';
import { UserService } from 'src/app/model/services/users.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/model/services/auth.service';
import { QuestionAnswer } from 'src/app/model/models/QuestionAnswer.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { QuestionAnswerFull } from 'src/app/model/models/QuestionAnswerFull.model';
import { Answer } from 'src/app/model/models/answer.model';
import { QuestionRepository } from 'src/app/model/question.repository';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [trigger('myInsertRemoveTrigger', [
    transition(':enter', [
      style({ opacity: 0, height: '1px' }),
      animate('2s', style({ opacity: 1, height: '150px' })),
    ]),
    transition(':leave', [
      animate('2s', style({ opacity: 0, height: '1px' }))
    ])
  ]),
  ],
})
export class AdminDashboardComponent implements OnInit, OnChanges, DoCheck {


  subscribe: Subscription;
  messages: Message[];
  myDate = new Date();
  questionList: QuestionAnswerFull[];
  isOpenedAnswer: number;
  isEditQuestion: boolean;
  arr: boolean[];
  currentQuestion: QuestionAnswerFull;
  currentQuestionIndex: number;
  // currentQuestion = new QuestionAnswer('', '', 'qqqq', 0, [[0, '']])
  a1: boolean;
  ctx: {};
  editAnswer1: boolean;

  totalEstimate = 10;


  //  dummy list:

  constructor(private userService: UserService, private authService: AuthService, private repo: QuestionRepository) { }

  construtor() {
    this.currentQuestionIndex = this.questionList.indexOf(this.currentQuestion);
  }


  ngOnInit() {
    this.editAnswer1 = false;
    this.arr = [false, false, false];
    this.questionList = [new QuestionAnswerFull("subject1",
      "subSubject1",
      "topic1",
      false,
      '2',
      'topic',
      'question1',
      Date.now(),
      'Mouse',
      [new Answer(0, 0, 'answer1', Date.now(), 'Mouse', false)])
      , new QuestionAnswerFull("subjet2",
        "subSubject2",
        "topic2",
        true,
        '3',
        'topic1',
        'question2',
        Date.now(), 'Mouse',
        [new Answer(0, 0, 'answer1', Date.now(), 'Mouse', true), new Answer(0, 0, 'answer1', Date.now(), 'Mouse', false)]),
    new QuestionAnswerFull("subject3",
      "subSubject3",
      "topic3",
      false,
      '3',
      'topic1',
      'question2', Date.now(), 'Mouse',
      [new Answer(0, 0, 'answer1', Date.now(), 'Mouse', true), new Answer(0, 0, 'answer1', Date.now(), 'Mouse', false)])];
    this.currentQuestion = this.questionList[0];
    this.currentQuestionIndex = this.questionList.indexOf(this.currentQuestion);

    let today = new Date();
    this.messages = <Array<Message>>[];
    this.userService.getMessages();
    this.subscribe = this.userService.onMessages
      .subscribe({
        next: (v) => {
          for (let item of v) {
            let message = new Message();
            message.fillFromJSON(item);
            this.messages.push(message);
          }
        }
      });
  }

  ngOnChanges(): void {

  };
  ngDoCheck(): void {
    this.ctx = { estimate: this.currentQuestion };
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe;
  }
  getMessages() {
    this.userService.getMessages();

  }

  openAnswers(i: number) {
    this.isOpenedAnswer = i;
    this.currentQuestion = this.questionList[i];
     const initialQuestion = this.currentQuestion.question;
    this.currentQuestionIndex = this.questionList.indexOf(this.currentQuestion);
    this.editAnswer1 = false;
  }

  getNewQuestions() {
  }

  onSubmitQuestion(i: number) {
    this.questionList.splice(i, 1);

  }

  currentAnswerIndex: number;
  onSelectAnswer(k: number) {
    this.currentAnswerIndex = k;
  }

  onRemoveQuestion(i: number, q: QuestionAnswerFull) {
    if (confirm("Remove question?")) {
      this.questionList.splice(i, 1);
      const question: QuestionAnswer = <QuestionAnswer>q;
      this.repo.addQuestion(question, "remove", null);
    };

  
  }

  onRemoveAnswer(i: number) {
    this.currentQuestion.answer.splice(i, 1);

  }

  onOkQuestionChanges(){

  }

  onCancelQuestionChanges(){
this.isEditQuestion = false;

  }

}
