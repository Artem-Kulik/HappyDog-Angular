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

  prop: ThingDto = {
    id: -1,
    name: '',
    image: ''
  };

  ngOnInit() {
  }

  Add(){
    this.userService.addThing(this.prop).subscribe((res: ApiResponse) => {
      if(res.isSuccessful){       
        this.router.navigate(['/index']);        
      }
    });
  }

}
