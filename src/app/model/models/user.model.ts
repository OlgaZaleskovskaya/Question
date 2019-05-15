export class User {
    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name= name;
    }

    private _mail: string;
    get mail(): string {
        return this._mail;
    }
    set mail(mail: string) {
        this._mail= mail;
    }

    private _type: string;
    get type(): string {
        return this._type;
    }
    set type(type: string) {
        this._type= type;
    }

    private _password: string;
    get password(): string {
        return this._password;
    }
    set password(password: string) {
        this._password= password;
    }

    constructor(name: string, mail: string, type: string, password: string){
this._name = name;
this._mail = mail;
this._type = type;
this._password = password;

    }


}