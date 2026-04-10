import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoAsset } from '../models/crypto-asset';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://localhost:7080/api/cryptoassets'; 

  constructor(private http: HttpClient) { }

  getAssets(): Observable<CryptoAsset[]> {
    return this.http.get<CryptoAsset[]>(this.apiUrl);
  }

  addAsset(asset: { symbol: string; quantity: number; purchasePrice: number }): Observable<CryptoAsset> {
    return this.http.post<CryptoAsset>(this.apiUrl, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}