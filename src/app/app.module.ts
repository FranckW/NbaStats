import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// On importe tous les composants. Cette partie est générée automatiquement si le composant est généré via le CLI
import { AppComponent } from './app.component';
import { DatagridComponentComponent } from './datagrid-component/datagrid-component.component';
import { NbaComponent } from './nba/nba.component';

// On importe les composants material design NECESSAIRES (souvent la cause d'un bug type composant inexistant dans la console)
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// On importe les services. Dans le cas précis ce service sert à charger un fichier json en local
import {DataService} from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    DatagridComponentComponent,
    NbaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
