import { Component } from '@angular/core';
import { IClient } from '../../model/interface/role';
import { SelectEmployeeComponent } from '../select-employee/select-employee.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [SelectEmployeeComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  selectedEmployee: IClient | null = null;

  onEventSelect(selectItem: IClient) {
    this.selectedEmployee = selectItem
  }
}
