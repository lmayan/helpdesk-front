import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {

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
    private service: ClienteService,
    private toast: ToastrService) { }

  ngOnInit(): void {
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

  create() {
    this.service.create(this.cliente).subscribe({
      next: () => {
      this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro')
      this.cliente = {perfis: [], dataCriacao: ''}
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
