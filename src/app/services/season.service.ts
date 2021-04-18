import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { SeasonDto } from '../models/seasonDto';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  constructor(private http: HttpClient) { }
  getSeasons(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://localhost:44381/api/season/getSeasons');
  }
}
