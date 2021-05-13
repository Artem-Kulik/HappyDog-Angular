import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { BuyDto } from '../models/byeDto';
import { FilterDto } from '../models/FilterDto';
import { SaleDto } from '../models/SaleDto';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient) { }

  getSaleDogs(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/');
  }

  getSaleDogsByBreed(breed: string): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getDogsByBreed/'+breed);
  }

  getSaleDogsFiltred(f: FilterDto): Observable<ApiCollectionResponse> {
    return this.http.post<ApiCollectionResponse>('https://localhost:44388/api/shop/getFiltredDods', f);
  }

  buy(b: BuyDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/shop/buy', b);
  } 
   
  getSaleDogsById(id: string): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getDogsById/'+id);
  }

  getSaleDogById(id: number): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getDogById/'+id);
  }

  edit(x: SaleDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/shop/edit', x);
  } 

  editSaleDog(x: SaleDto): Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44388/api/admin/editSaleDog', x);
  } 
  
  deleteSaleDog(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://localhost:44388/api/admin/deleteSaleDog/'+id);
  }

  addSaleDog(x: SaleDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44388/api/shop/addSaleDog', x);
  }   

  getSaleDogsSBBreed(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getSaleDogsSBBreed');
  }
  getSaleDogsSBType(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getSaleDogsSBType');
  }
  getSaleDogsSBAge(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getSaleDogsSBAge');
  }
  getSaleDogsSBInfo(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getSaleDogsSBInfo');
  }
  getSaleDogsSBPrice(): Observable<ApiCollectionResponse> {
    return this.http.get<ApiCollectionResponse>('https://localhost:44388/api/shop/getSaleDogsSBPrice');
  }
}

