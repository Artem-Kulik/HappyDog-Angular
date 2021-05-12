import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/registerDto';
import { ApiResponse } from 'src/app/models/apiResponse';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,) { }

  prop: RegisterDto = {
    name: '',
    email: '',
    password: '',
    photo: 'Photo'
  };

  ConfirmPassword: string = "";

  ngOnInit() {

  }

  Register() {
    if (this.prop.password == this.ConfirmPassword) {
      this.userService.Register(this.prop).subscribe((res: ApiResponse) => {
        if (res.isSuccessful) {
          this.spinner.show()          
          this.notifier.notify('success', 'You were successuly registred');
          setTimeout(() => {
            this.spinner.hide()
          }, 600);
          this.router.navigate(['/login']);
        }
        else {
          this.notifier.notify('error', 'There are empty fields');
        }
      });
    }
    else {
      this.notifier.notify('error', 'The passwords are different');
    }
  }
}
