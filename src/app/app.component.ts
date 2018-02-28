import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { People } from './people';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String;
  // people: People[];

  constructor(private appDataService: DataService) {
  }

  // tslint:disable-next-line:max-line-length
  // Suite à un petit souci de parsing du json, j'ai créé la structure de données en variable directement. Il reste juste à résoudre le parsing des données
  // via le json pour automatiser la récupération des données.

  // Détails item
  itemDetails = [
    { title: 'Attribute 1', value: 'Attribute 1', color: '#F8D1C7' },
    { title: 'Attribute 2', value: 'Attribute 2', color: '#F8D1C7' },
    { title: 'Attribute 3', value: 'Attribute 3', color: '#F8D1C7' },
    { title: 'Attribute 4', value: 'Attribute 4', color: '#F8D1C7' },
    { title: 'Attribute 5', value: 'Attribute 5', color: '#F8D1C7' },
    { title: 'Referenced From', value: '21/02/2018', color: '#E1E1E1' },
    { title: 'End of Life', value: '21/09/2019', color: '#E1E1E1' },
    { title: 'Weight (unité)', value: '250', color: '#E1E1E1' },
    { title: 'Volume (unité)', value: '124', color: '#E1E1E1' },
  ];

  // Liste des différents KPI à afficher
  kpis1 = [
    { title: 'Selling price', value: '4.07 €', color: '#E1E1E1' },
    { title: 'Total sales', value: '33095', color: '#E1E1E1' },
    { title: 'Turnover', value: '134.7 k€', color: '#E1E1E1' },
    { title: 'Sales day', value: '623d', color: '#E1E1E1' },
    { title: 'Promotion / year', value: '47d', color: '#E1E1E1' },
  ];

  kpis2 = [
    { title: 'Average selling price', value: '3.31 €', color: '#E1E1E1' },
    { title: 'Total sales', value: '9018', color: '#E1E1E1' },
    { title: 'Turnover', value: '27.9 k€', color: '#E1E1E1' },
    { title: 'Average sales / retailer', value: '22.6', color: '#E1E1E1' },
  ];

  kpis3 = [
    { title: 'Stock Total', value: '12875', color: '#E1E1E1' },
    { title: 'Total orders', value: '459', color: '#E1E1E1' },
  ];

  // Données des différents charts
  options1: Highcharts.Options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Affichage chronologique'
    },

    subtitle: {
      text: 'Test sous-titre'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    xAxis: {
      categories: ['S29 / 2016', 'S30 / 2016', 'S31 / 2016', 'S32 / 2016', 'S33 / 2016', 'S34 / 2016', 'S35 / 2016', 'S36 / 2016',
        'S37 / 2016', 'S38 / 2016', 'S39 / 2016', 'S40 / 2016', 'S41 / 2016', 'S42 / 2016', 'S43 / 2016', 'S44 / 2016',
        'S45 / 2016', 'S46 / 2016', 'S47 / 2016', 'S48 / 2016', 'S49 / 2016', 'S50 / 2016', 'S51 / 2016', 'S52 / 2016', 'S01 / 2017']
    },
    legend: {
      layout: 'horizontal',
    },

    series: [{
      name: 'Ventes réelles',
      data: [5, 9, 7, 6, 5, 2, 10, 7, 15, 23, 18, 2, null, null, null, null, null, null, null, null, null, null, null, null]
    }, {
      name: 'Ventes corrigées',
      data: [5, 9, 1, 3, 3, 1, 10, 7, 10, 14, 7, 2, null, null, null, null, null, null, null, null, null, null, null, null]
    }, {
      name: 'Prévisions impactées',
      data: [null, null, null, null, null, null, null, null, null, null, null, null, 2, 5, 7, 7, 10, 10, 23, 29, 20, 27, 33, 20, 2]
    }, {
      name: 'Prévisions brutes',
      data: [null, null, null, null, null, null, null, null, null, null, null, null, 2, 5, 7, 7, 9, 9, 23, 29, 20, 27, 33, 20, 2]
    }]
  };

  options2: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },

    subtitle: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    xAxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
        'SEP', 'OCT', 'NOV', 'DEC']
    },
    legend: {
      layout: 'none',
    },

    series: [{
      name: 'Ventes réelles',
      data: [25, 45, 65, 85, 105, 125, 145, 120, 100, 80, 60, 40]
    }, {
      name: 'Ventes corrigées',
      data: [22, 42, 62, 82, 102, 122, 142, 118, 98, 78, 58, 38]
    }]
  };

  options3: Highcharts.Options = {
    title: {
        text: 'Stock Distribution',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    color: 'black'
                }
            },
        }
    },
    series: [{
        type: 'pie',
        innerSize: '50%',
        data: [
            ['Warehouse',   951],
            ['Retailer', 100],
            ['Hub', 300],
        ]
    }]
};

// Données du dataGrid (columne dynamiques et structure de données)
  columns1 = [
    { columnDef: 'entity', header: 'Entity', cell: (element: Element) => `${element.entity}` },
    { columnDef: 'type', header: 'Type', cell: (element: Element) => `${element.type}` },
    { columnDef: 'stock', header: 'Stock', cell: (element: Element) => `${element.stock}` },
    { columnDef: 'value', header: 'Value', cell: (element: Element) => `${element.value}` },
    { columnDef: 'order', header: 'Order', cell: (element: Element) => `${element.order}` },
    { columnDef: 'coverage', header: 'Coverage', cell: (element: Element) => `${element.coverage}` },
    { columnDef: 'mp', header: 'MP', cell: (element: Element) => `${element.mp}` },
    { columnDef: 'smax', header: 'Smax', cell: (element: Element) => `${element.smax}` },
  ];

  datas1: Element[] = [
    { entity: 'Entity #1', type: 'Warehouse', stock: 751, value: 1502, order: 0, coverage: '12j', mp: 0, smax: 0 },
    { entity: 'Entity #2', type: 'Warehouse', stock: 200, value: 400, order: 0, coverage: '3j', mp: 0, smax: 0 },
    { entity: 'Entity #3', type: 'Retailer', stock: 8, value: 16, order: 3, coverage: '9j', mp: 2, smax: 0 },
    { entity: 'Entity #4', type: 'Retailer', stock: 2, value: 4, order: 9, coverage: '3j', mp: 2, smax: 0 },
    { entity: 'Entity #5', type: 'Hub', stock: 300, value: 600, order: 1000, coverage: '2j', mp: 0, smax: 0 },
    { entity: 'Entity #6', type: 'Warehouse', stock: 751, value: 1502, order: 0, coverage: '12j', mp: 0, smax: 0 },
    { entity: 'Entity #7', type: 'Warehouse', stock: 200, value: 400, order: 0, coverage: '3j', mp: 0, smax: 0 },
    { entity: 'Entity #8', type: 'Retailer', stock: 8, value: 16, order: 3, coverage: '9j', mp: 2, smax: 0 },
    { entity: 'Entity #9', type: 'Retailer', stock: 2, value: 4, order: 9, coverage: '3j', mp: 2, smax: 0 },
    { entity: 'Entity #10', type: 'Hub', stock: 300, value: 600, order: 1000, coverage: '2j', mp: 0, smax: 0 },
  ];

  datas2: Element[] = [
    { entity: 'Entity #1', type: 'Warehouse', stock: 751, value: 1502, order: 0, coverage: '12j', mp: 0, smax: 0 },
    { entity: 'Entity #2', type: 'Warehouse', stock: 200, value: 400, order: 0, coverage: '3j', mp: 0, smax: 0 },
    { entity: 'Entity #3', type: 'Retailer', stock: 8, value: 16, order: 3, coverage: '9j', mp: 2, smax: 0 },
  ];

  datas3: Element[] = [
    { entity: 'Entity #1', type: 'Warehouse', stock: 751, value: 1502, order: 0, coverage: '12j', mp: 0, smax: 0 },
    { entity: 'Entity #2', type: 'Warehouse', stock: 200, value: 400, order: 0, coverage: '3j', mp: 0, smax: 0 },
    { entity: 'Entity #3', type: 'Retailer', stock: 8, value: 16, order: 3, coverage: '9j', mp: 2, smax: 0 },
    { entity: 'Entity #4', type: 'Retailer', stock: 2, value: 4, order: 9, coverage: '3j', mp: 2, smax: 0 },
    { entity: 'Entity #5', type: 'Hub', stock: 300, value: 600, order: 1000, coverage: '2j', mp: 0, smax: 0 },
  ];

  ngOnInit() {
    // récupération du contenu du json via le service ... reste à coder le parsing
     this.appDataService.getJSON().subscribe((resultArray) => {console.log(resultArray); } );
  }

}

// interface qui définit les éléments du datagrid
export interface Element {
  entity: string;
  type: string;
  stock: number;
  value: number;
  order: number;
  coverage: string;
  mp: number;
  smax: number;
}
