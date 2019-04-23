import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PageService } from '../model/page.service';
import { TempoDataSource } from '../model/tempo.datasourse';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageService]

})
export class HeaderComponent implements OnInit {
  isLogIn: boolean;
  tempo: string;
obj = {
  name: "Misha",
  login: false
}


  constructor(private pageService: PageService, private data: TempoDataSource) {
    this.isLogIn = this.pageService.isLogin;
    this.tempo = this.pageService.tempo["name"];
    this.obj.login =  this.pageService.isLogin;
    this.obj.name =  this.pageService.tempo["name"];
  }


  ngOnInit() {

  }
  toSignIn() {
    this.pageService.isLogin = true;
    this.pageService.tempo["name"] = "petya";
  
   
    
  }

 push(){
 this.data.pushSubj().subscribe(response => console.log(response));
   }

}
