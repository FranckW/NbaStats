import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { GameDesc } from '../utils/gameDesc';

@Component({
  selector: 'app-datagrid-component',
  templateUrl: './datagrid-component.component.html',
  styleUrls: ['./datagrid-component.component.css']
})
export class DatagridComponentComponent implements OnInit {

  // Arguments d'entrée du composant (utilisés dans le template et injecté dans le template principal)
  @Input() columns: any;
  @Input() datas: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: any;
  dataSource: any;

  @Input() showFilter: Boolean = true;
  @Input() showPaginator: Boolean = true;

  // Gestion du filtre sur le datagrid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor() { }

  ngOnInit() {
    // Injection des données dans le datagrid
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource = new MatTableDataSource(this.datas);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // initialisation du sort et de la pagination
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setDatas(newDatas: Array<Object>) {
    this.datas = newDatas;
    this.dataSource = new MatTableDataSource(this.datas);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
