import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SubSubject } from 'src/app/model/models/subSubject.model';
import { Topic } from 'src/app/model/models/topic.model';
import { PageService } from 'src/app/model/models/page.service';

@Component({
  selector: 'app-add-topic-modal',
  templateUrl: './add-topic-modal.component.html',
  styleUrls: ['./add-topic-modal.component.css']
})
export class AddTopicModalComponent implements OnInit {

  constructor(public pageService: PageService) { }

  @Input() currentName: string;
  @Output() onAddTopic = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();
  @Input( ) toDo: string;
 
  newName = ""; 

  ngOnInit() { 
 this.newName = this.currentName;
  
  } 

  onSubmit() { 
   this.onAddTopic.emit(this.newName); 
  } 

  onCancel() { 
   this.onClose.emit(null); 
  } 

}
