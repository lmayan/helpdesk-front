import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss']
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {
    perfis: [],
    dataCriacao: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    this.service.findById(this.cliente.id).subscribe({
      next: res =>{
        res.perfis = [];
        this.cliente = res 
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toast.error(element.message)
          });
        } else {
          this.toast.error(ex.error.message)
        }
      }
    })
  }

  delete() {
    this.service.delete(this.cliente.id).subscribe({
      next: () => {
      this.toast.success('Cliente deletado com sucesso!', 'Delete')
      this.router.navigate(['clientes']) },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toast.error(element.message)
          });
        } else {
          this.toast.error(ex.error.message)
        }
      }
    })
  }

}
