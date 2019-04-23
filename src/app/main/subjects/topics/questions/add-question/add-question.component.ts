import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Topic } from 'src/app/model/topic.model';
import { Question } from 'src/app/model/question.model';
import { QuestionAnswer } from 'src/app/model/QuestionAnswer.model';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Input() currentTopic: Topic;
  @Output() onAddQuestion = new EventEmitter<QuestionAnswer>();
  @Output() onClose = new EventEmitter<string>();
  private question: string;
  private answer: string;


  ngOnInit() {


  }

  onSubmit() {
    let item = new QuestionAnswer("", this.currentTopic.id,
      this.question,
      this.answer
    )
    this.onAddQuestion.emit(item);
   this. onCancel();

  }

  onCancel() {
    this.onClose.emit(null);
  }


}
