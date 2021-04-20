import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { ThingDto } from 'src/app/models/thingDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-thing',
  templateUrl: './edit-thing.component.html',
  styleUrls: ['./edit-thing.component.css']
})
export class EditThingComponent implements OnInit {

  things: Array<ThingDto> = new Array<ThingDto>();

  constructor(private route: ActivatedRoute,
    private routerback: Router,
    private userService: UserService) { }

    prop: ThingDto = {
      id: '',
      name: '',
      image: ''
    };

  ngOnInit() {
    this.userService.getThings().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res.data);
        this.things = res.data;
      }
    });
    var id = this.route.snapshot.paramMap.get('id');

    var thing = this.things.find(x => x.id == id);    
  }

  Edit() {
    this.userService.EditThing(this.prop).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        console.log(res.message);
        this.routerback.navigate(['/things']);
      }
    });
  }

}
