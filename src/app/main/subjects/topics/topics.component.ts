import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionRepository } from 'src/app/model/question.repository';
import { Topic } from 'src/app/model/topic.model';
import { PageService } from 'src/app/model/page.service';
import { SubSubject } from 'src/app/model/subSubject.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnChanges {
  @Input() currentSubSubjectId: string;
  @Input() currentSubSubject: string;
 

  topicList: Topic[];
  currentId: string;
  currentIndex: number;
  currentTopic: Topic;
  isOpened: boolean;
  toDo: string;
  currentName: string;

  constructor(private repo: QuestionRepository, private pageService: PageService) {

  }

  ngOnInit() {
    this.isOpened = false;
  }

  ngOnChanges() {
    this.getTopics(this.currentSubSubjectId);
  }


  private onSelect(currentId: string, topic: Topic): void {
    this.currentId = currentId;
    this.currentTopic = topic;
    this.pageService.currentTopic =   this.currentTopic;
  }

  addTopic(newName: string) {
    if (newName) {
      this.repo.addTopic(this.currentSubSubjectId, newName, this.currentTopic, this.toDo)
        .subscribe((response) => {
          if (response == "Alredy exists") {
            alert("Alredy exists");
            this.showModal('new');
          }
          this.getTopics(this.currentSubSubjectId);
        }),
        error => console.log(error);
      this.isOpened = false;
    } else {
      alert("Enter new subject");
    }
  }

  showModal(toDo: string) {
    this.isOpened = true;
    this.toDo = toDo;
    this.currentName = toDo == "new"? "": this.currentTopic.name;

  }

  private getTopics(subSubId: string) {
    this.repo.getTopics(subSubId)
      .subscribe(response => {
        this.topicList = response;
        this.currentId = this.topicList[0].id;
        this.currentTopic = this.topicList[0];
        this.pageService.currentTopic =   this.currentTopic;
      }), error => console.log(error);
  }

  onCloseModal(smth: any) {
    this.isOpened = false;
    this.toDo = "";
  }

}
