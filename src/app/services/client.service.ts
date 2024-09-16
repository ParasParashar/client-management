import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IApiResponse } from '../model/interface/role';
import { Client } from '../model/interface/class/client';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllClients')
  }
  addUpdate(obj: Client) {
    return this.http.post<IApiResponse>(environment.API_URL + 'AddUpdateClient', obj)
  }
  deleteClientById(id: number) {
    return this.http.delete<IApiResponse>(environment.API_URL + 'DeleteClientByClientId?clientId=' + id)
  }

  // services for the project page with eh employes
  getAllEmployee(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllEmployee')
  }
  addClientProjectUpdate(obj: Client) {
    return this.http.post<IApiResponse>(environment.API_URL + 'AddUpdateClientProject', obj)
  }
  getAllClientProjects(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllClientProjects')

  }
}
