import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollapseModule } from 'angular-bootstrap-md';
import { NotifierService } from 'angular-notifier';
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

import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { CountDto } from 'src/app/models/countDto';

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
    private notifier: NotifierService,
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

  count: CountDto = {
    w: 0,
    h: 0,
    s: 0,
    k: 0,
    e: 0
  };
  countS: CountDto = {
    w: 0,
    h: 0,
    s: 0,
    k: 0,
    e: 0
  };

  public polarAreaChartData: SingleDataSet = [];
  public polarAreaChartDataS: SingleDataSet = [];
  public polarAreaChartLabels: Label[] = ['Watchdog', 'Hunting', 'Smart', 'Kind', 'Expensice'];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  ngOnInit() {
    this.getBreeds();
    this.getRequests();
    this.getUsers();
    this.getSaleDogs();
    this.getBreedCount();
  }
  getBreedCount(){
    this.adminService.getBreedCount().subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.count = res.data
        this.polarAreaChartData = [this.count.w, this.count.h, this.count.s, this.count.k, this.count.e];
      }
    });
    this.adminService.getSaleDogCount().subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.countS = res.data
        this.polarAreaChartDataS = [this.countS.w, this.countS.h, this.countS.s, this.countS.k, this.countS.e];
      }
    });    
  }


  imgSrc: string = '';
  UploadBigPhoto(e: any) {
    if (e.target != null) {
      if (e.target.files && e.target.files.item(0)) {
        this.formData.append('file', e.target.files.item(0) as File);
        this.adminService.UploadBigPhoto(this.mainBreed.id, this.formData).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
            this.formData = new FormData();
          }
        });
      }
    }
  }
  UploadMainPhoto(e: any) {
    if (e.target != null) {
      if (e.target.files && e.target.files.item(0)) {
        this.formData.append('file', e.target.files.item(0) as File);
        this.adminService.UploadMainPhoto(this.mainBreed.id, this.formData).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
            this.formData = new FormData();
          }
        });
      }
    }
  }
  UploadSaleMainPhoto(e: any) {
    if (e.target != null) {
      if (e.target.files && e.target.files.item(0)) {
        this.formData.append('file', e.target.files.item(0) as File);
        this.adminService.UploadSaleMainPhoto(this.EditAddSaleDog.id, this.formData).subscribe((res: ApiResponse) => {
          if (res.isSuccessful) {
            this.formData = new FormData();
          }
        });
      }
    }
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
        this.getBreedCount();
      }
    });
  }

  EditBreed() {
    this.adminService.editBreed(this.mainBreed).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.mainBreed == new BreedDto();
        this.getBreeds();
        this.part = "breeds";
        this.getBreedCount();
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
        this.getBreedCount();
      }
    });
  }

  EditSaleDog(id: number) {
    this.shopService.getSaleDogById(id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.EditAddSaleDog = res.data;
        this.part = "editsaledog";
        this.getBreedCount();
      }
    });
  }
  EditDFS() {
    this.shopService.editSaleDog(this.EditAddSaleDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.EditAddSaleDog = new SaleDto();
        this.getSaleDogs();
        this.part = "sales";
        this.getBreedCount();
      }
    });
  }

  AddDFS() {
    this.shopService.addSaleDog(this.EditAddSaleDog).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        this.EditAddSaleDog = new SaleDto();
        this.part = "sales"
        this.getSaleDogs();
        this.getBreedCount();
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
        this.getBreedCount();
      }
    });
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
        setTimeout(() => {
          this.spinner.hide()
        }, 600);
        this.notifier.notify('success', 'A new dog was put up for sale');
        this.getRequests();
        this.getBreedCount();
        this.getSaleDogs();
      }
    });
  }
  RequestFalse(id: number) {
    this.res.res = false;
    this.res.id = id.toString();
    this.adminService.sendRequest(this.res).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        setTimeout(() => {
          this.spinner.hide()
        }, 600);
        this.notifier.notify('success', 'The proposal was rejected');
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
    this.userService.LogOut();
    this.router.navigate(['/']);
  }
  Edit(id: number) {
    this.part = "edit";
    this.getBreed(id);
  }
  Dashboard() {
    this.part = "dashboard";
  }
  Breeds() {
    this.part = "breeds";
  }
  BreedsGr() {
    this.part = "grafic";
  }
  SalesGr() {
  this.part = "graficsale";
}
Sales() {
  this.part = "sales";
}
Users() {
  this.part = "users";
}
Requests() {
  this.part = "requests";
}
Add() {
  this.part = "add";
  this.mainBreed = new BreedDto();
}


SortBreed() {
  this.breedService.getBreedsSBBreed().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.breeds = res.data;
    }
  });
}
SortBreedType() {
  this.breedService.getBreedsSBType().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.breeds = res.data;
    }
  });
}
SortCountry() {
  this.breedService.getBreedsSBCountry().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.breeds = res.data;
    }
  });
}
SortHeight() {
  this.breedService.getBreedsSBHeight().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.breeds = res.data;
    }
  });
}
SortWeight() {
  this.breedService.getBreedsSBWeight().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.breeds = res.data;
    }
  });
}


SaleSortBreed() {
  this.shopService.getSaleDogsSBBreed().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.sales = res.data;
    }
  });
}
SaleSortType() {
  this.shopService.getSaleDogsSBType().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.sales = res.data;
    }
  });
}
SaleSortAge() {
  this.shopService.getSaleDogsSBAge().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.sales = res.data;
    }
  });
}
SaleSortPrice() {
  this.shopService.getSaleDogsSBPrice().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.sales = res.data;
    }
  });
}
SaleSortInfo() {
  this.shopService.getSaleDogsSBInfo().subscribe((res: ApiCollectionResponse) => {
    if (res.isSuccessful) {
      this.sales = res.data;
    }
  });
}
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}
}
