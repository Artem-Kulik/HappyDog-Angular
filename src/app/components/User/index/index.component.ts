import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  Images : Array<string> = new Array<string>();

  constructor(private seasonService: SeasonService, 
              private router: Router) { }

  ngOnInit() {
    this.seasonService.getSeasons().subscribe((res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)        
        this.Images = res.data;        
      }
    });
  }

  Spring(){

  }

  Summer(){

  }

  Autumn(){

  }

  Winter(){

  }

  LogOff(){
  }


  MyPage(){
    this.router.navigate(['/my-things']);
  }
}
