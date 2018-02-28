import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  // Arguments d'entrée du composant (utilisés dans le template et injecté dans le template principal)
  @Input() titlebar = 'Specifications';
  @Input() titleicon = 'info';
  @Input() dts: any;

  constructor() { }

  ngOnInit() {
  }

}
