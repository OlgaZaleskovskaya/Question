import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from './user.model';
import { Serializable } from './serializable';

export class Message extends Serializable{
    private _id: string;
    private _message: string;
    private _date: number;
    private _sender: string;
    private _reciever: string;
    private _topic: string;
    private _parentMessage?: Message;
    private _answer?: Message[];
//    constructor(id: string, message: string, date: number, sender: string, reciever: string, topic: string, parentMessage?: Message,
//        answer?: Message[]) {
//         super();
//         this.id = id;
//         this._message = message;
//         this._date = date;
//         this._sender = sender;
//         this._reciever = reciever;
//         this._topic = topic;
//         this._parentMessage = parentMessage;
//      this._answer = answer;
//     }

    get message(): string {
        return this._message;
    }
    set message(message: string) {
        this._message = message;
    }

    set date(date: number) {
        this._date =date;
    }
    get date(): number {
        return this._date;
    }

    set sender(sender: string) {
        this._sender = sender;
    }
    get sender(): string {
        return this._sender;
    }

    set reciever(reciever: string) {
        this._reciever = reciever;
    }
    get reciever(): string {
        return this._reciever;
    }

    set topic(topic: string) {
        this._topic = topic;
    }
    get topic(): string {
        return this._topic;
    }

    set parentMessage(parentMessage: Message) {
        this._parentMessage = parentMessage;
    }
    get parentMessage(): Message {
        return this._parentMessage;
    }

    set answer(answer: Message[]) {
        this._answer = answer;
    }
    get answer(): Message[] {
        return this._answer;
    }

    
    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

}