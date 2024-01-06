import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.scss']
})
export class ChamadoListComponent implements OnInit {

  // ELEMENT_DATA: Chamado[] = [
  //   {
  //     id: 1,
  //     dataAbertura: '21/06/2027',
  //     dataFechamento: '21/06/2027',
  //     prioridade: 'ALTA',
  //     status: 'ANDAMENTO',
  //     titulo: 'Chamado 1',
  //     descricao: 'Teste Chamado 1',
  //     tecnico: 1,
  //     cliente: 5,
  //     nomeCliente: 'Novo Cliente',
  //     nomeTecnico: 'Lucas Mayan',
  //   }
  // ]

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private chamadoService: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.chamadoService.findAll().subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }, error: (e) => { console.error(e); }
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  orderByStatus(status: any) {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element);
      }
    })
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

}
