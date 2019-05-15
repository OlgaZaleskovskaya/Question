import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/models/message.model';
import { UserService } from 'src/app/model/services/users.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {
letterList: Message[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMessages();
  }

}
