import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endowments } from '../models/endowment.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EndowmentsService {

  constructor(private http: HttpClient) { }

  getAllEndowments(): Observable<Endowments[]> {
    return this.http.get<Endowments[]>(`${baseUrl}/mock`);
  }
  getAll(): Observable<Endowments[]> {
    return this.http.get<Endowments[]>(baseUrl);
  }

  get(id: any): Observable<Endowments> {
    return this.http.get<Endowments>(`${baseUrl}/mock/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
