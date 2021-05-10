import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BreedDto } from 'src/app/models/breedDto';
import { ThesisDto } from 'src/app/models/tesisDto';
import { BreedService } from 'src/app/services/breed.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-breed-info',
  templateUrl: './breed-info.component.html',
  styleUrls: ['./breed-info.component.css']
})
export class BreedInfoComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private breedService: BreedService,
    private route: ActivatedRoute) {
  }

  IsLoggedIn: boolean = false;
  email: string = 'email.com';

  breeds: Array<BreedDto> = new Array<BreedDto>();
  theses: Array<ThesisDto> = new Array<ThesisDto>();
  breedId: string = '';

  mainBreed: BreedDto = {
    id: -1,
    mainPhoto: '',
    bigPhoto: '',

    mainDescription: '',
    bigDescription: '',

    country: '',
    breed: '',
    height: '',
    weight: '',
    lifeExpectancy: '',

    dogType: '',
    aggressiveness: 0,
    activity: 0,
    securityQualities: 0,
    health: 0,
    noise: 0,
    intelligence: 0,
    training: 0,
    maintenanceCost: 0,
    molting: 0,
    price: '',
  };

  type: string = '';

  ngOnInit() {
    this.spinner.show()
    var id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.breedId = id;
    }
    this.getUserInfo();
    this.getBreed(Number.parseInt(this.breedId));
    this.getBreeds();
    this.getTheses(Number.parseInt(this.breedId));
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
  getBreed(id: number) {
    this.breedService.getBreed(id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.mainBreed = res.data;
      }
    });
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
      // }
      // else {
      //   this.breedService.getBreeds("Watchdog").subscribe((res: ApiCollectionResponse) => {
      //     if (res.isSuccessful) {
      //       this.breeds = res.data;
      //     }
      //   });
      //   localStorage.setItem("type", "Watchdog");
      // }
    }
  }
  getTheses(id: number) {
    this.breedService.getTheses(id).subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.theses = res.data;
      }
    });
  }

  ShowInfo(id: number) {
    this.breedId = id.toString();  
  this.getUserInfo();
  this.getBreed(Number.parseInt(this.breedId));
  this.getBreeds();
  this.getTheses(Number.parseInt(this.breedId));
  }

  Back(){
    this.router.navigate(['/info']);
  }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }
}
