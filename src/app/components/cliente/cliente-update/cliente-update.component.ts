import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss']
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

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

  validFields(): boolean {
    return this.nome.valid && this.cpf.valid
      && this.email.valid && this.senha.valid
  }

  addPerfil(perfil: any) {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1)
      console.log(this.cliente.perfis);
    } else {
      this.cliente.perfis.push(perfil)
      console.log(this.cliente.perfis);
    }
  }

  update() {
    this.service.update(this.cliente).subscribe({
      next: () => {
      this.toast.success('Cliente atualizado com sucesso!', 'Update')
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
