import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subj } from 'src/app/model/subj.model';
import { PageService } from 'src/app/model/page.service';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.css']
})
export class AddSubjectModalComponent implements OnInit {

  constructor(private pageService: PageService) { }

  @Input() toDo: string;
  @Input() currentSubjectName;
  @Output() onAddSubject = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();

  isDisable: boolean;


  ngOnInit() {
    console.log("toDo =", this.toDo)
  }

  onSubmit() {

    this.onAddSubject.emit(this.currentSubjectName);
  }

  onCancel() {
    this.onClose.emit(null);
  }



}
