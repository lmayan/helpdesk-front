import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private service: TecnicoService) { }
  
  ngOnInit(): void {
    this.findAll()
  }
  
  ngAfterViewInit() {
  }

  findAll(){
    this.service.findall().subscribe(res => {
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}