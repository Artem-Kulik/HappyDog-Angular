import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../models/registerDto';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiTokenResponse } from '../models/apiResponse';
import { LoginDto } from '../models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders = new HttpHeaders();
  loginStatus = new EventEmitter<boolean>();
  
  constructor(private http: HttpClient) { }
  Register(x: RegisterDto): Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44388/api/account/register', x);
  }

  Login(x: LoginDto): Observable<ApiTokenResponse> {
    return this.http.post<ApiTokenResponse>('https://localhost:44388/api/account/login', x);
  }  

  UploadPhoto(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/UploadThingImage/'+id, file, {headers: this.headers})
  }

  LogOut(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Id");
    this.loginStatus.emit(false);
  }
}
