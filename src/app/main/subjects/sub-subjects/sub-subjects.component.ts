import { Component, OnInit, Input } from '@angular/core';
import { SubSubject } from 'src/app/model/models/subSubject.model';
import { QuestionRepository } from 'src/app/model/question.repository';
import { PageService } from 'src/app/model/models/page.service';
import { Subj } from 'src/app/model/models/subj.model';

@Component({
  selector: 'app-sub-subjects',
  templateUrl: './sub-subjects.component.html',
  styleUrls: ['./sub-subjects.component.css']
})
export class SubSubjectsComponent implements OnInit {

  @Input() currentSubjectId: string;

  subSubjectList: SubSubject[];
  currentItem:  SubSubject;
  currentId: string;
  currentIndex: number;
  isOpened: boolean;
  currentSubSubject: SubSubject;
  toDo: string;

  constructor(private repo: QuestionRepository,  public pageService: PageService) {

  }

  ngOnInit() {
    this.isOpened = false;
    this.toDo = "";
  }

  ngOnChanges() {
    this.getSubSubs(this.currentSubjectId);

  }


  private onSelect(currentId: string, currentSubSubject: SubSubject): void {
    this.currentId = currentId;
    this.currentSubSubject = currentSubSubject;
    this.pageService.currentSubSubject = this.currentSubSubject;
  }

  private getSubSubs(subId: string) {
    this.repo.getSubSubs(subId)
      .subscribe(response => {
        this.subSubjectList = response;
        this.currentId = this.subSubjectList[0]['id'];
        this.currentSubSubject = this.subSubjectList[0];
        this.pageService.currentSubSubject = this.currentSubSubject;
      }), error => console.log(error);
  }

  addSubSubject(item: SubSubject) {
    if (item.name) {
      this.repo.addSubSubject(this.currentSubjectId, item, this.toDo)
        .subscribe((response) => {
          if (response == "Alredy exists") {
            alert("Alredy exists");
            this.showModal('new');
          }
          this.getSubSubs(this.currentSubjectId);
        }),
        error => console.log(error);
      this.isOpened = false;
    } else {
      alert("Enter new subject");
    }
    this.toDo = "";
  }

  showModal(toDo?: string) {
    this.toDo = toDo;
    if(toDo == "new"){
      this. currentItem = new SubSubject('','','');
    } else{
      this. currentItem = this.currentSubSubject;
    }
    this.isOpened = true;
  }
  
  onCloseModal(smth: any) {
    this.toDo = "";
    this.isOpened = false;
  }

}



