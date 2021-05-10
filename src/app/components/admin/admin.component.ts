import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollapseModule } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BreedDto } from 'src/app/models/breedDto';
import { RequestDto } from 'src/app/models/requestDto';
import { Result } from 'src/app/models/result';
import { SaleDto } from 'src/app/models/SaleDto';
import { userInfoDto } from 'src/app/models/userInfoDto';
import { AdminService } from 'src/app/services/admin.service';
import { BreedService } from 'src/app/services/breed.service';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', './custom.css',
    './jquery.datetimepicker.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
    private shopService: ShopService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private breedService: BreedService,
    private router: Router) { }

  part: string = "dashboard";
  formData: FormData = new FormData();

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

  breeds: Array<BreedDto> = new Array<BreedDto>();
  users: Array<userInfoDto> = new Array<userInfoDto>();
  requests: Array<RequestDto> = new Array<RequestDto>();
  sales: Array<SaleDto> = new Array<SaleDto>();

  Cbreed: number = 0;
  Cuser: number = 0;
  Csale: number = 0;
  Crequest: number = 0;

  EditAddSaleDog: SaleDto = {
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

  ngOnInit() {
    this.getBreeds();
    this.getRequests();
    this.getUsers();
    this.getSaleDogs();
  }

  getUsers() {
    console.log("getUsers: ");
    this.adminService.getUsers().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.users = res.data;
        this.Cuser = res.data.length;
      }
    });
  }
  getRequests() {
    this.adminService.getRequests().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.requests = res.data;
        this.Crequest = res.data.length;
      }
    });
  }
  getBreeds() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 1000)

    this.breedService.getBreeds("All").subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.breeds = res.data;
        this.Cbreed = res.data.length;
      }
    });
  }
  getSaleDogs() {
    this.shopService.getSaleDogs().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        this.sales = res.data;
        this.Csale = res.data.length;
      }
    });
  }


  getBreed(id: number) {
    this.breedService.getBreed(id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.mainBreed = res.data;
      }
    });
  }
  deleteBreed(breed: string) {
    this.adminService.deleteBreed(breed).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getBreeds();
      }
    });
  }

  EditBreed() {
    this.adminService.editBreed(this.mainBreed).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.mainBreed == new BreedDto();
        this.getBreeds();
        this.part = "breeds";
      }
      else {

      }
    });
  }
  AddBreed() {
    this.adminService.addBreed(this.mainBreed).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.mainBreed = new BreedDto();
        this.getBreeds();
        this.part = "breeds";
      }
    });
  }

  EditSaleDog(id: number) {
    this.shopService.getSaleDogById(id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.EditAddSaleDog = res.data;
        this.part = "editsaledog";
      }
    });
  }
  EditDFS() {
    this.shopService.editSaleDog(this.EditAddSaleDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.EditAddSaleDog = new SaleDto();
        this.getSaleDogs();
        this.part = "sales";
      }
    });
  }

  AddDFS() {
    this.shopService.addSaleDog(this.EditAddSaleDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
      }
    });
  }
  AddSaleDog() {
    this.EditAddSaleDog = new SaleDto();
    this.part = "addsaledog";
  }

  DeleteSaleDog(id: number) {
    this.shopService.deleteSaleDog(id).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getSaleDogs();
      }
    });
  }

  uploadPhoto(files: FileList) {
    // if(files.item && files.item(0))
    // {
    //   this.formData.append('file', files.item(0));
    // }
    // this.userService.UploadPhoto(this.id, this.formData).subscribe((res: ApiResponse)=>{
    //   if(res.isSuccessful){

    //   }
    // })
  }

  res: Result = {
    res: false,
    id: ""
  }
  RequestTrue(id: number) {
    this.res.res = true;
    this.res.id = id.toString();
    this.adminService.sendRequest(this.res).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getRequests();
      }
    });
  }
  RequestFalse(id: number) {
    this.res.res = false;
    this.res.id = id.toString();
    this.adminService.sendRequest(this.res).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.getRequests();
      }
    });
  }

  ChangeType(e: any) {
    this.mainBreed.dogType = e.target.value;
  }
  ChangeSaleType(e: any) {
    this.EditAddSaleDog.dogType = e.target.value;
  }

  LogOut() {
    this.router.navigate(['/']);
  }
  Edit(id: number) {
    this.part = "edit";
    this.getBreed(id);
  }
  Dashboard() {
    this.part = "dashboard";
    console.log("dashboard");
  }
  Breeds() {
    this.part = "breeds";
    console.log("breeds");
  }
  Sales() {
    this.part = "sales";
    console.log("sales");
  }
  Users() {
    this.part = "users";
  }
  Requests() {
    this.part = "requests";
    console.log("requests");
  }
  Add() {
    this.part = "add";
    this.mainBreed = new BreedDto();
  }
}
