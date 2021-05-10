import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { BreedDto } from '../models/breedDto';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }  

  editBreed(x: BreedDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/admin/editBreed', x);
  } 

  addBreed(x: BreedDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/admin/addBreed', x);
  }

  deleteBreed(breed: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://localhost:44388/api/admin/deleteBreed/'+breed);
  }

  getUsers(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/admin/getUsers');
  }

  getRequests(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/admin/getRequests');
  }

  sendRequest(x: Result): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/admin/sendRequest', x);
  }
}
