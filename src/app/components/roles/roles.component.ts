import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IApiResponse, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { LoaderComponentComponent } from '../loader-component/loader-component.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponentComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  http = inject(HttpClient);
  roleList: IRole[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.getAllRoles();
  };
  // function to fetch the api
  getAllRoles() {
    this.http.get<IApiResponse>(environment.API_URL + 'GetAllRoles').subscribe((res: IApiResponse) => {
      this.roleList = res.data
      this.isLoading = false
    })
  }

}
