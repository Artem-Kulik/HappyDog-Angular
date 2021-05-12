import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BreedGameDto } from 'src/app/models/BreedGameDto';
import { Result } from 'src/app/models/result';
import { userInfoDto } from 'src/app/models/userInfoDto';
import { BreedGameService } from 'src/app/services/breed-game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private breedGameService: BreedGameService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService) { 
    }

  prop: BreedGameDto = {
    id: -1,
    breedImage: '',
    firstAnswer: '',
    secondAnswer: '',
    thirdAnswer: '',
    rightAnswer: '',
    prise: 100,
    win: 1
  };
  myInfo: userInfoDto = {
    id: '',
    name: '',
    city: '',
    email: '',
    phoneNumber: '',
    coins: 0,
    photo: ''
  };
  res: Result = {
    id: '',
    res: false
  };
  formData: FormData = new FormData();

  myAnswer: string = 'Select answer';

  ngOnInit() {
    this.spinner.show()
    this.getRandomBreed();
    this.getUserInfo();
    
    setTimeout(() => {
      this.spinner.hide()
    }, 400);
  }
  getRandomBreed() {
    console.log("getRandomBreed");
    this.breedGameService.GetRandomGreed().subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.prop = res.data
      }
      else {
        console.log("Error get breed")
      }
    });
  }

  getUserInfo() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.userService.getUserInfo(id).subscribe((res: ApiSingleResponse) => {
        if (res.isSuccessful) {
          this.myInfo = res.data
        }        
      });
    }
  }

  Edit(){
    this.userService.editUserInfo(this.myInfo).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getUserInfo();           
        this.notifier.notify('success', 'Info was updated');    
      }
      else {
        this.notifier.notify('error', 'Error in input (...)');   
      }
    });
  }

  Next() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.res.id = id;
    }
    if (this.myAnswer != this.prop.rightAnswer) {
      this.res.res = false;
      this.notifier.notify('error', 'Wrong answer - ' + this.prop.prise + "$");
      this.breedGameService.AnswerRes(this.res).subscribe((res: ApiResponse) => {
        this.ngOnInit();
      });
    }
    else {
      this.res.res = true;
      this.notifier.notify('success', 'Right answer + ' + this.prop.prise + "$");   
      this.breedGameService.AnswerRes(this.res).subscribe((res: ApiResponse) => {
            this.ngOnInit();
     this.myAnswer = "Select answer";
    this.getUserInfo();
      });
    }

  }
  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }

  UploadMyPhoto(e: any) {
    if (e.target != null) {
      if (e.target.files && e.target.files.item(0)) {
        this.formData.append('file', e.target.files.item(0) as File);
        this.userService.AddMyPhoto(this.myInfo.id, this.formData).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
            this.formData = new FormData();
            this.getUserInfo();
          }
        });
      }
    }
  }

  ChangeF() {
    this.myAnswer = this.prop.firstAnswer;
  }
  ChangeS() {
    this.myAnswer = this.prop.secondAnswer;
  }
  ChangeT() {
    this.myAnswer = this.prop.thirdAnswer;
  }
}
