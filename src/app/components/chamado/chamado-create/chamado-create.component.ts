import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacao: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacao: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(){
    this.chamadoService.create(this.chamado).subscribe({
      next: () => { 
        this.toastrService.success("Chamado criado com sucesso!", "Novo Chamado")
        this.router.navigate(["chamados"])
      },
      error: (err) => { 
        this.toastrService.error("Erro ao criar chamado!", "ERRO")
        console.error('Error occurred:', err); },
      complete: () => {}
    });
  }

  findAllClientes(){
    this.clienteService.findall().subscribe({
      next: (resp) => { this.clientes = resp; },
      error: (err) => { console.error('Error occurred:', err); },
      complete: () => {}
    });
  }

  findAllTecnicos(){
    this.tecnicoService.findall().subscribe({
      next: (resp) => { this.tecnicos = resp;},
      error: (err) => { console.error('Error occurred:', err); },
      complete: () => {}
    });
  }

  validaCampo(): boolean{
    return this.prioridade.valid && this.status.valid && 
      this.titulo.valid && this.observacao.valid && 
      this.tecnico.valid && this.cliente.valid  
  }

}
