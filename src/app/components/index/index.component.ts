import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiSingleResponse } from 'src/app/models/apiResponse';
import { UserService } from 'src/app/services/user.service';
import { isBlock } from 'typescript';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css', './text.css', './bootstrap.css']
})
export class IndexComponent implements OnInit {

  mainThesis: string = "";
  secondThesis: string = "";
  mainPhoto: string = "";
  IsLoggedIn: boolean;

  email:string='email.com';

  constructor(private userService: UserService) {    
    this.IsLoggedIn = false;
    this.getUserInfo();
  }
  getUserInfo() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.userService.getUserInfo(id).subscribe((res: ApiSingleResponse) => {
        if (res.isSuccessful) {
          this.email = res.data.email
        }        
      });
    }
  }
  ngOnInit() {
    this.userService.loginStatus.subscribe((status) => {
      this.IsLoggedIn = status;
      console.log(status)
    });  
    if(localStorage.getItem("Id") != null){
      this.IsLoggedIn = true;
    }
    else this.IsLoggedIn = false;   
  }

  LogOut(){
    this.userService.LogOut();    
  }
}
