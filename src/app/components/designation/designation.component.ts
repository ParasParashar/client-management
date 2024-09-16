import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, IDesignation } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { LoaderComponentComponent } from '../loader-component/loader-component.component';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule, LoaderComponentComponent],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  masterService = inject(MasterService);
  designationList: IDesignation[] = [];
  isLoader: boolean = true;
  // handling api with error handling
  ngOnInit(): void {
    this.masterService.getDesignation().subscribe((designation: IApiResponse) => {
      this.designationList = designation.data;
      this.isLoader = false;

    }, error => {
      console.log('Api error: ' + error)
    })
  }

}
