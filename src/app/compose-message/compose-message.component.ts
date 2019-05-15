import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Message } from '../model/models/message.model';
import { AuthService } from '../model/services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../model/services/users.service';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {

  topic: string;
  messageBody: string;
  message: Message;
  sending = false;
  currentTime: number;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }   
  ngOnInit(): void {
    this.userService.onSendMessage
    .subscribe({
      next: (v) => {
       alert(v);
        this.closePopup();
      }
    });
  }
  onSubmit(form: NgForm) {
    this.currentTime = Date.now();
    this.sending = true;
    this.message = new Message();
    this.message.id = '';
    this.message.message = this.messageBody;
    this.message.topic = this.topic;
    this.message.date = this.currentTime;
    this.message.reciever = "admin";
    this.message.sender = this.authService.currentUser.name;
    this.message.answer=null;
    this.message.parentMessage = null;
    this.userService.sendMessage(this.message);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
 
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}


