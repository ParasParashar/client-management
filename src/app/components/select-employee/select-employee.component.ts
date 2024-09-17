import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IClient } from '../../model/interface/role';

@Component({
  selector: 'app-select-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-employee.component.html',
  styleUrl: './select-employee.component.css'
})
export class SelectEmployeeComponent {
  @Output() clientSelected = new EventEmitter<any>();
  selectedClient: IClient | null = null;
  clients: IClient[] = [
    { name: 'Client A', contact: '1234567890', project: 'Website Redesign' },
    { name: 'Client B', contact: '9876543210', project: 'Mobile App Development' },
    { name: 'Client C', contact: '826543210', project: 'React  Development' }
  ];
  onSelectClient(event: any) {
    const selectedIndex = event.target.selectedIndex - 1;
    if (selectedIndex >= 0) {
      const selectedClient = this.clients[selectedIndex];
      this.clientSelected.emit(selectedClient);
    }
  }
}
