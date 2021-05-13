import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    isAdmin(){
      const token = localStorage.getItem('Token');
      if(token!=null){
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        if(decodedJwtData.roles!=null){
          if(decodedJwtData.roles == "Admin"){
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

  headers: HttpHeaders = new HttpHeaders();
  UploadMainPhoto(id: number, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/EditBreedMainPhoto/'+id, file, {headers: this.headers})
  }

  UploadBigPhoto(id: number, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/EditBreedBigPhoto/'+id, file, {headers: this.headers})
  }

  UploadSalePhoto(id: number, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/UploadSalePhoto/'+id, file, {headers: this.headers})
  }

  UploadSaleMainPhoto(id: number, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('https://localhost:44388/api/image/UploadSaleMainPhoto/'+id, file, {headers: this.headers})
  }

  getBreedCount():  Observable<ApiSingleResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44388/api/admin/getBreedCount')
  }
  getSaleDogCount():  Observable<ApiSingleResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44388/api/admin/getSaleDogCount')
  }  
}
