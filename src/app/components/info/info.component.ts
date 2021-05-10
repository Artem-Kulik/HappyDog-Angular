import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BreedDto } from 'src/app/models/breedDto';
import { BreedService } from 'src/app/services/breed.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private breedService: BreedService) {
  }

  IsLoggedIn: boolean = false;

  email: string = 'email.com';

  breeds: Array<BreedDto> = new Array<BreedDto>();

  ngOnInit() {
    this.spinner.show()
    this.getUserInfo();
    this.getBreeds();
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);

    if (localStorage.getItem("Id") != null) {
      this.IsLoggedIn = true;
    }
    else this.IsLoggedIn = false;
  }

  getUserInfo() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.userService.getUserInfo(id).subscribe((res: ApiSingleResponse) => {
        if (res.isSuccessful) {
          this.email = res.data.email;
        }
      });
    }
  }
  getBreeds() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 1000)

    var type = localStorage.getItem("type");
    if (type != null) {
      this.breedService.getBreeds(type).subscribe((res: ApiCollectionResponse) => {
        if (res.isSuccessful) {
          this.breeds = res.data;
        }
      });
    }
    else {
      this.breedService.getBreeds("Watchdog").subscribe((res: ApiCollectionResponse) => {
        if (res.isSuccessful) {
          this.breeds = res.data;
        }
      });
      localStorage.setItem("type", "Watchdog");
    }
  }

  ShowInfo(id:number){
    this.router.navigate(['/breed-info', {id: id}]);  
  }
  
  Watchdog() {
    localStorage.setItem("type", "Watchdog");
    this.getBreeds();
  }
  Hunting() {
    localStorage.setItem("type", "Hunting");
    this.getBreeds();
  }
  Smart() {
    localStorage.setItem("type", "Smart");
    this.getBreeds();
  }
  Kind() {
    localStorage.setItem("type", "Kind");
    this.getBreeds();
  }
  Expensive() {
    localStorage.setItem("type", "Expensive");
    this.getBreeds();
  }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }
}

