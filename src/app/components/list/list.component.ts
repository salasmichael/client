import { Component, OnInit } from '@angular/core';
import { Endowment, Endowments } from 'src/app/models/endowment.model';
import { EndowmentsService } from 'src/app/services/endowments.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  endowments?: Endowments[];
  tempEndowments?: Endowments[];
  serial = '';


  constructor(private endowmentsService: EndowmentsService) { }

  ngOnInit(): void {
    this.retrieve()
  }

  retrieve(): void {
    this.endowmentsService.getAllEndowments()
      .subscribe({
        next: (data:any) => {
          this.endowments = data.data;
          this.tempEndowments = this.endowments; 
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieve();
  }

  search(ev:any){
    ev.target.value == '' && (this.endowments = this.tempEndowments)
  }

  searchTitle(): void {
    let found = this.endowments?.filter(f=> f.serial == this.serial);
    this.endowments =  found?.length !=  0 ? found : this.tempEndowments;
  }

}
