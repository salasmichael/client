import { Component, OnInit } from '@angular/core';
import { Endowment, Endowments } from 'src/app/models/endowment.model';
import { EndowmentsService } from 'src/app/services/endowments.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  endowment: Endowment = {
    nameUser: '',
    email: '',
    serial:'',
    date: ''
  };
  submitted = false;

  constructor(private endowmentsService: EndowmentsService) { }
  endowments?: Endowments[];
  endowmentsData?:any [] =[];

  ngOnInit(): void {
    this.retrieve();
    this.retrieveEndowments();
  }

  retrieveEndowments(): void {
    this.endowmentsService.getAllEndowments()
      .subscribe({
        next: (data:any) => {
          this.endowments = data.data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieve(): void {
    this.endowmentsService.getAll()
      .subscribe({
        next: (data:any) => {
          this.endowmentsData = data.data;
        },
        error: (e) => console.error(e)
      });
  }

  save(): void {

    let found = this.endowments?.find(e=> e.serial == this.endowment.serial);

    if(!this.endowment.serial || !this.endowment.nameUser || !this.endowment.email || !this.endowment.date){
      Swal.fire({
        icon: 'warning',
        title: "Registro",
        text: "Debe llenar todos los campos.",
        showConfirmButton: true,
      })
      return
    }
    
    const data = {
      serial: this.endowment.serial,
      name: found?.name,
      type: found?.type,
      sysOperative: found?.systemOperative,
      username: this.endowment.nameUser,
      email: this.endowment.email,
      dateAssignment: this.endowment.date
    };

    this.endowmentsService.create(data)
      .subscribe({
        next: (res) => {
          if(res.status){
            Swal.fire({
              icon: 'success',
              title: "Registrado",
              text: res.data,
              showConfirmButton: true,
            })
            this.submitted = true;
            this.retrieve();
            this.new()
          }else{
            Swal.fire({
              icon: 'warning',
              title: "Registro",
              text: res.message,
              showConfirmButton: true,
            })
          }
        },
        error: (e) => console.log(e)
      });
  }

  deleteAssig(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Eliminar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.endowmentsService.delete(id)
          .subscribe({
            next: (res) => {
              if(res.status){
                Swal.fire(
                  'Eliminado!',
                   res.data
                )
                this.retrieve()
              }
            },
            error: (e) => console.log(e)
          });
      }
    })
  }

  new(): void {
    this.submitted = false;
    this.endowment = {
      serial:'',
      nameUser: '',
      email: '',
      date: ''
    };
  }


}

