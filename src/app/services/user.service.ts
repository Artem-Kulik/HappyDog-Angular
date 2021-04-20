import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../models/registerDto';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiTokenResponse } from '../models/apiResponse';
import { LoginDto } from '../models/loginDto';
import { ThingDto } from '../models/thingDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders = new HttpHeaders();
  
  constructor(private http: HttpClient) { }
  Register(x: RegisterDto): Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44381/api/account/register', x);
  }

  Login(x: LoginDto): Observable<ApiTokenResponse> {
    return this.http.post<ApiTokenResponse>('https://localhost:44381/api/account/login', x);
  }

  getThings(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44381/api/user/getThings');
  }

  addThing(x: ThingDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44381/api/user/addThing', x);
  }

  UploadPhoto(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Contect-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('http://localhost:44381/api/image/UploadThingImage/'+id, file, {headers: this.headers})
  }
}
