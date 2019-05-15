import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'questionary';
 
  ngOnInit(){
firebase.initializeApp({
  apiKey: "AIzaSyCCJ1rAQgt9T9223h1G1uhwWpy3NE3mwgE",
    authDomain: "questionary-d6795.firebaseapp.com",
})

  }
}
