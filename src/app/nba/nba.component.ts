import { Component, OnInit, ViewChild } from '@angular/core';
import { DatagridComponentComponent } from '../datagrid-component/datagrid-component.component';
import { NbaApiService } from '../utils/nba-api.service';
import { GameDesc } from '../utils/gameDesc';

@Component({
    selector: 'app-nba',
    templateUrl: './nba.component.html',
    styleUrls: ['./nba.component.css']
})
export class NbaComponent implements OnInit {
    titlebar: string;
    titleImg: string;
    @ViewChild(DatagridComponentComponent) datagridComponent;
    gridColumns: Array<Object>;
    gridDatas: Array<GameDesc>;

    constructor(private nbaApi: NbaApiService) {
        this.gridColumns = [
            { columnDef: 'date', header: 'Date', cell: (element: GameDesc) => element.date },
            { columnDef: 'time', header: 'Time', cell: (element: GameDesc) => element.time },
            { columnDef: 'awayTeam', header: 'Away team', cell: (element: GameDesc) => element.awayTeam },
            { columnDef: 'homeTeam', header: 'Home team', cell: (element: GameDesc) => element.homeTeam },
            { columnDef: 'location', header: 'Location', cell: (element: GameDesc) => element.location },
        ];
        this.titlebar = 'NBA';
        this.titleImg = '../../../assets/img/nba-logo.png';
    }

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.gridDatas = new Array<GameDesc>();
        this.nbaApi.getTodayGames()
            .subscribe(
                data => {
                    for (const item of data['dailygameschedule']['gameentry']) {
                        this.gridDatas.push(new GameDesc(item['date'],
                            item['time'], item['homeTeam']['Abbreviation'],
                            item['awayTeam']['Abbreviation'], item['location']));
                    }
                    this.datagridComponent.setDatas(this.gridDatas);
                },
                error => {
                    console.log('error retrieving game datas');
                    console.log(error);
                }
            );
    }

}
