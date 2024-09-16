import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IApiResponse, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  http = inject(HttpClient);
  roleList: IRole[] = [];

  ngOnInit(): void {
    this.getAllRoles();
  };
  // function to fetch the api
  getAllRoles() {
    this.http.get<IApiResponse>(environment.API_URL + 'GetAllRoles').subscribe((res: IApiResponse) => {
      this.roleList = res.data
    })
  }

}
