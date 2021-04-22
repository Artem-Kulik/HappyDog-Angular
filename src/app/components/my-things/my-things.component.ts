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
  formData: FormData = new FormData();

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getThings().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res);
        this.things = res.data;
      }
    });
  }

  uploadPhoto(e: any, id: string) {
    this.formData.delete('file');
    if (e.files != null) {
      if (e.files.item && e.files.item(0)) {
        this.formData.append('file',e.files.item(0)!);
        this.userService.UploadPhoto(id, this.formData).subscribe((res: ApiResponse) => {
          if(res.isSuccessful){
            this.load();
          }
        })
      }      
    }
  }
}
