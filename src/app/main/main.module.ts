import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TopicsComponent } from './subjects/topics/topics.component';
import { QuestionsComponent } from './subjects/topics/questions/questions.component';
import { QuestionComponent } from './subjects/topics/questions/question/question.component';
import { QuestionRepository } from '../model/question.repository';
import { TempoDataSource } from '../model/tempo.datasourse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SubSubjectsComponent } from './subjects/sub-subjects/sub-subjects.component';

import { AddSubjectModalComponent } from './subjects/add-subject-modal/add-subject-modal.component';
import { RouterModule } from '@angular/router';
import { AddSubsubjectModalComponent } from './subjects/sub-subjects/add-subsubject-modal/add-subsubject-modal.component';
import { AddTopicModalComponent } from './subjects/topics/add-topic-modal/add-topic-modal.component';
import { AddQuestionComponent } from './subjects/topics/questions/add-question/add-question.component';
import { EditQuestionModalComponent } from './subjects/topics/questions/question/edit-question-modal/edit-question-modal.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DropDownDirective } from '../model/dropdown.directive';
import { HighLightDirective } from '../model/highlight.directive';



@NgModule({
  declarations: [
    MainComponent,
    SubjectsComponent,
    SubSubjectsComponent,
    TopicsComponent,
    QuestionsComponent,
    QuestionComponent,
    AddSubjectModalComponent,
    AddSubsubjectModalComponent,
    AddTopicModalComponent,
    AddQuestionComponent,
    EditQuestionModalComponent,
    DropDownDirective,
    HighLightDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  exports: [
    MainComponent,
    SubjectsComponent,
    TopicsComponent,
    QuestionsComponent,
    QuestionComponent

  ],

  providers:
    [QuestionRepository,
      TempoDataSource,

    ]
})
export class MainModule { }
