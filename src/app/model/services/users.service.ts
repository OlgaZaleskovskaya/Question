import { Injectable } from '@angular/core';
import { TempoDataSource } from '../tempo.datasourse';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';


@Injectable()
export class UserService {
    messages: Message[];
    onMessages = new Subject<Message[]>();
    onSendMessage = new Subject<string>();
    inCabinet: boolean;
    constructor(private datasourse: TempoDataSource, private authService: AuthService) {
    }
    sendMessage(message: Message) {
        this.datasourse.sendMessage(message)
            .subscribe(response => this.onSendMessage.next(response)), error => console.log(error);

    }
    getMessages() {
        this.datasourse.getMessages(this.authService.currentUser)
            .subscribe(response => {
            this.messages = response;
                this.onMessages.next(this.messages);
            }), error => console.log(error);

    }


}