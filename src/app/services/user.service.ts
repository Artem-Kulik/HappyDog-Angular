import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../models/registerDto';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse, ApiTokenResponse } from '../models/apiResponse';
import { LoginDto } from '../models/loginDto';
import { userInfoDto } from '../models/userInfoDto';
import { SaleDto } from '../models/SaleDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders = new HttpHeaders();
  loginStatus = new EventEmitter<boolean>();

  isUser(){
    const token = localStorage.getItem('Token');
    if(token!=null){
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if(decodedJwtData.roles!=null){
        if(decodedJwtData.roles == "User"){
          return true;
        }
        else return false;
      }
    else{
      return false;
    }
    }
    else{
      return false;
    }
  }
  
  constructor(private http: HttpClient) { }
  Register(x: RegisterDto): Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44388/api/account/register', x);
  }

  Login(x: LoginDto): Observable<ApiTokenResponse> {
    return this.http.post<ApiTokenResponse>('https://localhost:44388/api/account/login', x);
  }  

  UploadPhoto(id: number, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/AddMyDogImage/'+id, file, {headers: this.headers})
  }

  AddMyPhoto(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/AddMyPhoto/'+id, file, {headers: this.headers})
  }

  LogOut(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Id");
    this.loginStatus.emit(false);
  }

  getUserInfo(id:string): Observable<ApiSingleResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44388/api/user/'+id);
  }  

  editUserInfo(x:userInfoDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/user/', x);
  }  

  sendRequest(x: SaleDto): Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44388/api/user/sendRequest', x);
  }  
}
