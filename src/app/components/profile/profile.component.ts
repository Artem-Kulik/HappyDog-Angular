import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BreedGameDto } from 'src/app/models/BreedGameDto';
import { Result } from 'src/app/models/result';
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
    private breedGameService: BreedGameService) { }

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

  res: Result = {
    id: '',
    res: false
  };

  myAnswer: string = 'Select answer';

  ngOnInit() {
    this.getRandomBreed();
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

  Next() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.res.id = id;
    }
    console.log(this.myAnswer + " ? " + this.prop.rightAnswer);
    if (this.myAnswer != this.prop.rightAnswer) {
      this.res.res = false;
      this.breedGameService.AnswerRes(this.res).subscribe((res: ApiResponse) => {
        this.getRandomBreed();
      });
    }
    else{
      this.res.res = true;
      this.breedGameService.AnswerRes(this.res).subscribe((res: ApiResponse) => {
        this.getRandomBreed();
      });
    }
    this.myAnswer = "Select answer";
  }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
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
