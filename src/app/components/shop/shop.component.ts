import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BuyDto } from 'src/app/models/byeDto';
import { FilterDto } from 'src/app/models/FilterDto';
import { SaleDto } from 'src/app/models/SaleDto';
import { userInfoDto } from 'src/app/models/userInfoDto';
import { BreedService } from 'src/app/services/breed.service';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private userService: UserService,
    private shopService: ShopService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private breedService: BreedService,
    private route: ActivatedRoute) {
  }

  IsLoggedIn: boolean = false;
  email: string = 'email.com';
  dogs: Array<SaleDto> = new Array<SaleDto>();
  Sphotos: Array<string> = new Array<string>();

  Modaldog: SaleDto = {
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

  myInfo: userInfoDto = {
    id: '',
    name: '',
    city: '',
    email: '',
    phoneNumber: '',
    coins: 0,
    photo: ''
  };

  Fbreed: string = "";

  ngOnInit() {
    // this.spinner.show() 
    this.getUserEmail();
    this.getUserInfo();
    this.getSaleDogs();
    //setTimeout(() => {
    //  this.spinner.hide()
    //}, 1000);

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
          this.myInfo = res.data
        }
      });
    }
  }
  getUserEmail() {
    var id = localStorage.getItem("Id");
    if (id != null) {
      this.userService.getUserInfo(id).subscribe((res: ApiSingleResponse) => {
        if (res.isSuccessful) {
          this.email = res.data.email;
        }
      });
    }
  }
  getSaleDogs() {
    this.shopService.getSaleDogs().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.dogs = res.data;
      }
    });

  }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }

  ShowInfo(id: number) {
    var arr = this.dogs.find(x => x.id == id)?.photos;
    if (arr != null) this.Sphotos = arr;

    var m = this.dogs.find(x => x.id == id);
    if (m != null) this.Modaldog = m;

    var modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "block";
      localStorage.setItem("close", "1")
    }
  }

  FindByName() {
    this.shopService.getSaleDogsByBreed(this.Fbreed).subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        var arr = res.data;
        if (arr != null) {
          this.dogs = arr;
        }
      }
    });
  }
  filter: FilterDto = {
    min: 0,
    max: 0,
    type: ""
  };
  Sort() {
    this.shopService.getSaleDogsFiltred(this.filter).subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        var arr = res.data;
        if (arr != null) {
          this.dogs = arr;
        }
      }
    });
  }

  b: BuyDto = {
    id: '',
    idD: 0,
    price: 0
  }
  Buy(id: number) {
    this.b.id = this.myInfo.id;
    var d = this.dogs.find(x => x.id == id);
    if (d != null) {
      if (d.price <= this.myInfo.coins) {
        this.b.idD = d.id;
        this.b.price = d.price;
        this.shopService.buy(this.b).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
            this.ngOnInit();
          }
        });
      }
      else{
        this.notifier.notify('error', "You haven`t enough money");
      }
    }
  }


  Close() {
    var el = localStorage.getItem("close");
    if (el != null) {
      if (el == "1") {
        localStorage.setItem("close", "2")
      }
      else if (el == "2") {
        var modal = document.getElementById("myModal");
        if (modal != null) {
          modal.style.display = "none";
          localStorage.removeItem("close");
        }
      }
    }
  }
  CClick() {
    localStorage.setItem("close", "1");
  }
}

