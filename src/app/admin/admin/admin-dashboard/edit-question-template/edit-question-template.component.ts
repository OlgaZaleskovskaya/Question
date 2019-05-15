import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-edit-question-template',
  templateUrl: './edit-question-template.component.html',
  styleUrls: ['./edit-question-template.component.css']
})
export class EditQuestionTemplateComponent implements OnInit {
  @Input()
  headerTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
