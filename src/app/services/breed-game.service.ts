import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class BreedGameService {

  constructor(private http: HttpClient) { }
  GetRandomGreed(): Observable<ApiSingleResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44388/api/breedGame');
  }

  AnswerRes(x:Result): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/breedGame', x);
  }

}
