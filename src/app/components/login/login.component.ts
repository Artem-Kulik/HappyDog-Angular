import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiTokenResponse } from 'src/app/models/apiResponse';
import { LoginDto } from 'src/app/models/loginDto';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  // prop: LoginDto = {
  //   email:'a',
  //   password: 'a'
  // };

  prop: LoginDto = {
    email: '',
    password: ''
  };

  Login(){
    this.userService.Login(this.prop).subscribe((res : ApiTokenResponse) => {
      if (res.isSuccessful) {
        const jwtData = res.token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        if(decodedJwtData.roles == "User"){          
          this.spinner.show()          
          setTimeout(() => {
            this.spinner.hide()
          }, 600);
          this.notifier.notify('success', 'Welcome ' + this.prop.email);
          localStorage.setItem("Token", res.token);   
          localStorage.setItem("Id", res.message);   
          this.userService.loginStatus.emit(true);
          this.router.navigate(['/']);     
        }
        else if(decodedJwtData.roles == "Admin"){
          this.spinner.show()          
          setTimeout(() => {
            this.spinner.hide()
          }, 600);
          this.notifier.notify('success', 'Welcome ' + this.prop.email);
          localStorage.setItem("Token", res.token);   
          localStorage.setItem("Id", res.message);   

          this.userService.loginStatus.emit(true);
          this.router.navigate(['/admin']);  
        }    
      }
      else{
        this.notifier.notify('error', 'Email or password is wrong');
      }
    });   
  }
}
