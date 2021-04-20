import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse } from '../models/apiResponse';
import { SeasonDto } from '../models/seasonDto';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  constructor(private http: HttpClient) { }
  getSeasons(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44381/api/season/getSeasons');
  }
}
