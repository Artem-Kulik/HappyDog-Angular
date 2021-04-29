import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router) { }

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
        localStorage.setItem("Token", res.token);   
        localStorage.setItem("Id", res.message);   
        this.userService.loginStatus.emit(true);
        console.log('QQq');
        this.router.navigate(['/']);            
      }
      else{
      }
    });   
  }
}
