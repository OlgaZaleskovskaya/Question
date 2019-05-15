import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionRepository } from 'src/app/model/question.repository';
import { Subj } from 'src/app/model/models/subj.model';
import { PageService } from 'src/app/model/models/page.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],

})
export class SubjectsComponent implements OnInit {

  subjectList: Subj[];
  subjects: string[];
  currentId: string;
  currentSubject: Subj;
  currentSubjectName: string;

  isLogIn: boolean;
  isSigned: Object;
  tempo: boolean;
  isOpened: boolean;
  toDo: string;

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }


  constructor(private repo: QuestionRepository,  public pageService: PageService) {

  }

  ngOnInit() {
    this.isOpened = false;
    this.toDo = "";
    this.currentSubjectName = "";
    this.getSubjects();
    this.repo.subjectSubscribe.subscribe(response => {
      this.subjectList = response;
      this.currentSubject = this.subjectList[0]
      this.currentId = this.subjectList[0].id;
      this.pageService.currentSubject = this.currentSubject;
    });

  }

  private onSelect(currentSubject: Subj): void {
    this.currentId = currentSubject.id;
    this.currentSubject = currentSubject;
    this.pageService.currentSubject = this.currentSubject;
  }

  showModal(todo: string) {
    this.toDo = todo;
    this.currentSubjectName = this.toDo == "Add new subject" ? "" : this.currentSubject.name;
    this.isOpened = true;
  }

  onAddSubject(newName: string) {
    const sub = this.createSubject(newName);
     if (newName) {
     this.repo.addSubject(sub, this.toDo)
         .subscribe((response) => {
            if (response == "Alredy exists") {
              alert("Already exists");
              this.showModal('new');
          }
            this.getSubjects();
            this.onCloseModal(null);
          }),
          error => console.log(error);
        this.isOpened = false;
      } else {
        alert("Enter new subject");
      }
  }

  onCloseModal(smth?: any) {
    this.toDo = "";
    this.isOpened = false;
  }


  private getSubjects() {
    this.repo.getSubjects();
  }



  private createSubject(name: string): Subj {
    let sub: Subj;
    if (this.toDo == "Add new subject") {
      sub = new Subj('', name);
    } else {
      sub = new Subj(this.currentSubject.id, name);
    }
    return sub;
  }

}
