import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (res) => { 
        this.chamado = res
      },
      error: (err) => { 
        this.toastrService.error("Erro ao consultar chamado!", "ERRO")
        console.error('Error occurred:', err); },
      complete: () => {}
    });
  }

  update(){
    this.chamadoService.update(this.chamado).subscribe({
      next: () => { 
        this.toastrService.success("Chamado atualizado com sucesso!", "Atualizar Chamado")
        this.router.navigate(["chamados"])
      },
      error: (err) => { 
        this.toastrService.error("Erro ao atualizar chamado!", "ERRO")
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

  returnStatus(status: string){
    if(status == '0'){
      return 'ABERTO'
    } else if(status == '1'){
      return 'ANDAMENTO'
    }else{
      return 'ENCERRADO'
    }
  }

  returnPrioridade(prioridade: string){
    if(prioridade == '0'){
      return 'BAIXA'
    } else if(prioridade == '1'){
      return 'MEDIA'
    }else{
      return 'ALTA'
    }
  }

}
