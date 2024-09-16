import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponentComponent } from '../loader-component/loader-component.component';
import { ClientService } from '../../services/client.service';
import { IApiResponse, IClientProject, IEmployee } from '../../model/interface/role';
import { Client } from '../../model/interface/class/client';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponentComponent, CommonModule, DatePipe],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl('2024-09-16T10:34:42.058Z'),
    expectedEndDate: new FormControl('2024-09-16T10:34:42.058Z'),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl('2024-09-16T10:34:42.058Z'),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),

  });
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.getAllClients();
    this.getAllEmployees();
    this.getAllProjects();
  }

  employeeList: IEmployee[] = [];
  clientList: Client[] = [];
  isLoader = true;
  // signal is also a  new data type which is come in 17 version of angular
  clientProjects = signal<IClientProject[]>([])

  getAllEmployees() {
    this.clientService.getAllEmployee().subscribe((res: IApiResponse) => {
      this.employeeList = res.data;
    })
  }
  getAllClients() {
    this.clientService.getAllClients().subscribe((res: IApiResponse) => {
      this.clientList = res.data;
    })
  }

  getAllProjects() {
    this.clientService.getAllClientProjects().subscribe((res: IApiResponse) => {
      this.clientProjects.set(res.data);
      this.isLoader = false;
    });
  }

  onAddClient() {
    try {
      const formValue = this.projectForm.value;
      this.clientService.addClientProjectUpdate(formValue).subscribe((res: IApiResponse) => {
        if (res.result) {
          console.log('Form updated successfully')
          this.getAllProjects();
        } else {
          alert(res.message)
          console.log('Error in creating a project: ' + res.message)
        }
      })
    } catch (error) {
      console.log('Error in creating a project', error);
    }

  }
}
