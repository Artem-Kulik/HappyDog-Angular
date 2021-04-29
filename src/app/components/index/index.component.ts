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
  condition: boolean=false;
  IsLoggedIn: boolean;

  email:string='email.com';

  constructor(private userService: UserService) {    
    this.IsLoggedIn = true;
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
    console.log(this.IsLoggedIn);
    if(localStorage.getItem("num") == "1")
    {
      this.mainPhoto = "https://localhost:44388/Images/SI4.jpg"
      this.mainThesis = "WE LOVE PETS";
      this.secondThesis = "Lack of cunning, incessant joy in the eyes, will meet you for the hundredth time even better than the first. The one who will make your every morning truly special. It`s dogs 🖤🖤🖤";
      this.condition = true;
      localStorage.setItem("num", "2");
    }   
    else if(localStorage.getItem("num") == "2")
    {
      this.mainPhoto = "https://localhost:44388/Images/slider-7.jpg"
      this.mainThesis = "CARE FOR DOGS";
      this.secondThesis = "One of the human laws says: Take care of our younger brothers (animals). After all, giving love to someone - it will be given to us. Let`s care about our dogs and love them by all heard 🖤🖤🖤";
      this.condition = false;
      localStorage.setItem("num", "1");
    }   
  }

  Next() {
    this.ngOnInit();
  }

  LogOut(){
    this.userService.LogOut();    
  }
}
