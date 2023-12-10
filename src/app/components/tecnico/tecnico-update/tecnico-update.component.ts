import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.scss']
})
export class TecnicoUpdateComponent implements OnInit {
  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    this.service.findById(this.tecnico.id).subscribe({
      next: res =>{
        res.perfis = [];
        this.tecnico = res 
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
      console.log(this.tecnico.perfis);
    } else {
      this.tecnico.perfis.push(perfil)
      console.log(this.tecnico.perfis);
    }
  }

  update() {
    this.service.update(this.tecnico).subscribe({
      next: () => {
      this.toast.success('Tecnico atualizado com sucesso!', 'Update')
      this.router.navigate(['tecnicos']) },
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
