import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionAnswer } from 'src/app/model/models/QuestionAnswer.model';
import { Topic } from 'src/app/model/models/topic.model';
import { PageService } from 'src/app/model/models/page.service';



@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent implements OnInit {
  // @Input() toDo: string;
  // @Input() currentSubSubject:string;
  @Input() question: QuestionAnswer;
  @Input() currentMessage: string;
  @Output() onSubmit = new EventEmitter<QuestionAnswer>();
  @Output() onCancel = new EventEmitter<any>();
  currentTopicName: string;
  currentSubSubjectName: string;

  constructor(private pageService: PageService) {

  }

  ngOnInit() {
    this.currentTopicName = this.pageService.currentTopic.name;
    this.currentSubSubjectName = this.pageService.currentSubSubject.name;

  }

  submit() {
    this.onSubmit.emit(this.question);
  }
  cancel() {
    this.onCancel.emit(null);

  }

}
