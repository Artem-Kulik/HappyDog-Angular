import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { ThingDto } from 'src/app/models/thingDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-things',
  templateUrl: './my-things.component.html',
  styleUrls: ['./my-things.component.css']
})
export class MyThingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  things: Array<ThingDto> = new Array<ThingDto>();

  ngOnInit() {
    this.userService.getThings().subscribe((res: ApiCollectionResponse) => {
      if(res.isSuccessful){       
        this.things = res.data;        
      }
    });
  }

  

}
