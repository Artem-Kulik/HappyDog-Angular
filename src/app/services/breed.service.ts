import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  constructor(private http: HttpClient) { }

  getBreeds(x:string): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/breed/'+x);
  }

  getBreed(x:number): Observable<ApiSingleResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44388/api/breed/getBreed/'+x);
  }

  getTheses(id:number): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/breed/getTheses/'+id);
  }
}
