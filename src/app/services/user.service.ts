import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../models/registerDto';
import { Observable } from 'rxjs';
import { ApiResponse, ApiTokenResponse } from '../models/apiResponse';
import { LoginDto } from '../models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  Register(x: RegisterDto):  Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44381/api/account/register', x);
  }

  Login(x: LoginDto):  Observable<ApiTokenResponse> {
    return this.http.post<ApiTokenResponse>('https://localhost:44381/api/account/login', x);
  }
}
