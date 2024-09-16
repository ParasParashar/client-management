import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }
  // creating fetch request sing servce
  getDesignation() {
    return this.http.get<IApiResponse>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation')
  }
}