import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/interface/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { IApiResponse } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { LoaderComponentComponent } from '../loader-component/loader-component.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponentComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  isLoader: boolean = false;
  clientService = inject(ClientService);
  ngOnInit(): void {
    this.loadClient();
  };

  loadClient() {
    this.isLoader = true;
    this.clientService.getAllClients().subscribe((client: IApiResponse) => {
      this.clientList = client.data
      this.isLoader = false;
    }, error => {
      console.log('Error in loading client', error)
    })
  };

  onSaveClient() {
    try {
      this.clientService.addUpdate(this.clientObj).subscribe((client: IApiResponse) => {
        if (client.result) {
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(client.message);
          this.loadClient();
        }
      }, err => {
        console.log('Error in saving client', err)
        alert('Error in saving client')
      })
    } catch (error) {
      console.log('Error in saving client', error)
    }

  };

  onDeleteClient(id: number) {
    try {
      let isConfirm = confirm('Are you sure you want to delete');
      if (isConfirm) {

        this.clientService.deleteClientById(id).subscribe((client: any) => {
          if (client.result) {
            this.loadClient();
            this.clientObj = new Client();
          } else {
            alert(client.message);
            this.loadClient();
          }
        })
      }
    } catch (error) {
      console.log('Error in deleting client', error)
    }
  }

  onEditClient(obj: Client) {
    this.clientObj = obj;
  }
  onReset() {
    this.clientObj = new Client();
  }

}
