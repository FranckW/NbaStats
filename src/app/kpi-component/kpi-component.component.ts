import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { chart } from 'highcharts';

@Component({
  selector: 'app-kpi-component',
  templateUrl: './kpi-component.component.html',
  styleUrls: ['./kpi-component.component.css']
})
export class KpiComponentComponent implements OnInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  // Arguments d'entrée du composant (utilisés dans le template et injecté dans le template principal)

  @Input() titlebar = ' Sales';
  @Input() titleicon = 'info';
  @Input() kpiEnabled = false;
  @Input() kpiTitle;
  @Input() kpis: any;

  @Input() chartTitle;
  @Input() chartEnabled = false;
  @Input() chartOptions: any;

  @Input() gridTitle1;
  @Input() gridEnabled1 = false;
  @Input() gridColumns1: any;
  @Input() gridDatas1: any;

  @Input() gridTitle2;
  @Input() gridEnabled2 = false;
  @Input() gridColumns2: any;
  @Input() gridDatas2: any;

  @Input() gridTitle3;
  @Input() gridEnabled3 = false;
  @Input() gridColumns3: any;
  @Input() gridDatas3: any;

  constructor() { }

  ngOnInit() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // Affichage du contenu du json dans la console. Base de départ du parsing (faisable aussi dans le composant principal)
    this.chart = chart(this.chartTarget.nativeElement, this.chartOptions);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.chart = null;
  }

}
