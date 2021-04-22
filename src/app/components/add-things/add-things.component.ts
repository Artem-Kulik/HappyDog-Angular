import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse';
import { ThingDto } from 'src/app/models/thingDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-things',
  templateUrl: './add-things.component.html',
  styleUrls: ['./add-things.component.css']
})
export class AddThingsComponent implements OnInit {

  constructor(private userService: UserService,  
              private router: Router) { }
  formData: FormData = new FormData();

  prop: ThingDto = {
    id: '',
    name: '',
    image: ''
  };

  ngOnInit() {
  }

  Add(){
    var id = localStorage.getItem("Id");
    if(id != null){
      this.prop.id = id;
    }
    this.userService.addThing(this.prop).subscribe((res: ApiResponse) => {
      if(res.isSuccessful){       
        this.router.navigate(['/my-things']);        
      }
    });
  }
}
