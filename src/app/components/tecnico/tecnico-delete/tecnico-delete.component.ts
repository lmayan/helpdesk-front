import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.scss']
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    perfis: [],
    dataCriacao: ''
  };

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

  delete() {
    this.service.delete(this.tecnico.id).subscribe({
      next: () => {
      this.toast.success('Tecnico deletado com sucesso!', 'Delete')
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
