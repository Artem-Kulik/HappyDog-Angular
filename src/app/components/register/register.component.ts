import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/registerDto';
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router) { }

  prop: RegisterDto = {
    name: '',
    email:'',
    password: '',
    photo: 'Photo'
  };

  ngOnInit() {
    
  }

  Register(){

    this.userService.Register(this.prop).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        console.log(res.message);
        this.router.navigate(['/login']);
      }
      else{
      }
    });
  }


}
