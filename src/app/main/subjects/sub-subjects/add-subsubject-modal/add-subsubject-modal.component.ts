import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubSubject } from 'src/app/model/models/subSubject.model';

@Component({
  selector: 'app-add-subsubject-modal',
  templateUrl: './add-subsubject-modal.component.html',
  styleUrls: ['./add-subsubject-modal.component.css']
})
export class AddSubsubjectModalComponent implements OnInit {

  constructor() { }
  @Input() currentSubSubject: SubSubject;
  @Input() toDo: string;
  @Output() onAddSubSubject = new EventEmitter<SubSubject>();
  @Output() onClose = new EventEmitter<string>();
  isDisable: boolean;
  newName: string;

  ngOnInit() {
    this.isDisable = this.toDo == "remove" ? true : false;
    this.newName = this.currentSubSubject.name;
  }

  onSubmit() {
    this.currentSubSubject.name = this.newName;
    this.onAddSubSubject.emit(this.currentSubSubject);
  }

  onCancel() {
    this.onClose.emit(null);
  }


}
