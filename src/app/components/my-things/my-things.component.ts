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

  load(){
    this.userService.getThings().subscribe((res: ApiCollectionResponse) => {
      if(res.isSuccessful){    
        console.log(res.data);
        this.things = res.data;        
      }
    });
  }
  
  uploadPhoto(id:string, files: FileList){
    if(files.item && files.item(0))
    {
      this.formData.append('file', files.item(0));
    }
    this.userService.UploadPhoto(id, this.formData).subscribe((res: ApiResponse)=>{
      if(res.isSuccessful){
                
      }
    })
  }

}