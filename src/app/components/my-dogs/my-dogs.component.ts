import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { Result } from 'src/app/models/result';
import { SaleDto } from 'src/app/models/SaleDto';
import { userInfoDto } from 'src/app/models/userInfoDto';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-my-dogs',
  templateUrl: './my-dogs.component.html',
  styleUrls: ['./my-dogs.component.css']
})
export class MyDogsComponent implements OnInit {
  constructor(private userService: UserService,
    private shopService: ShopService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) {
  }

  myInfo: userInfoDto = {
    id: '',
    name: '',
    city: '',
    email: '',
    phoneNumber: '',
    coins: 0,
    photo: ''
  };
  formData: FormData = new FormData();
  DogIdAddPhoto: number = 0;
  part: string = 'edit';

  EditDog: SaleDto = {
    name: '',
    id: 0,
    breed: '',
    dogType: '',
    price: 0,
    info: '',
    photos: new Array<string>(),
    age: '',
    mainPhoto: '',
    myDescription: ''
  };

  AddDog: SaleDto = {
    name: '',
    id: 0,
    breed: '',
    dogType: '',
    price: 0,
    info: '',
    photos: new Array<string>(),
    age: '',
    mainPhoto: '',
    myDescription: ''
  };

  mydogs: Array<SaleDto> = new Array<SaleDto>();

  ngOnInit() {
    // this.spinner.show()
    this.getUserInfo();
    this.getMyDogs();
    // setTimeout(() => {
    //   this.spinner.hide()
    // }, 1000);
  }

  ChangeType(e:any){
    console.log(e.target.value);
    this.AddDog.dogType = e.target.value;
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

  getMyDogs() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.shopService.getSaleDogsById(id).subscribe((res: ApiSingleResponse) => {
        if (res.isSuccessful) {
          this.mydogs = res.data
          this.EditDog = this.mydogs[0];
        }
      });
    }
  }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }

  GoEdit(id: number) {
    this.shopService.getSaleDogById(id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.EditDog = res.data
      }
    });
  }

  uploadPhoto(event: EventTarget) {
    // if (event != null) {
    //   if (event.files.item && event.files.item(0)) {
    //     this.formData.append('file', event.files.item(0) as File);
    //   }
    //   this.userService.UploadPhoto(this.EditDog.id.toString(), this.formData).subscribe((res: ApiResponse) => {
    //     if (res.isSuccessful) {

    //     }
    //   });
    // }
  }

  EditMain() {
    this.shopService.edit(this.EditDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getMyDogs();
      }
    });
  }

  SendRequest() {
    this.userService.sendRequest(this.AddDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.AddDog = new SaleDto();
      }
    });
  }

  AddPhoto() {
    this.part = 'add';
  }
  Edit() {
    this.part = 'edit';
  }
  Sale() {
    this.part = 'sale';
  }
}
