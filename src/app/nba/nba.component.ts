import { Component, OnInit, ViewChild } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameDesc } from './gameDesc';
import * as moment from 'moment';
import { DatagridComponentComponent } from '../datagrid-component/datagrid-component.component';

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
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic RnJhbmNrVzowNDA2OTI5OQ=='
        })
    };

    constructor(private http: HttpClient) {
        this.gridColumns = [
            { columnDef: 'date', header: 'Date', cell: (element: GameDesc) => `${element.date}` },
            { columnDef: 'time', header: 'Time', cell: (element: GameDesc) => `${element.time}` },
            { columnDef: 'awayTeam', header: 'Away team', cell: (element: GameDesc) => `${element.awayTeam}` },
            { columnDef: 'homeTeam', header: 'Home team', cell: (element: GameDesc) => `${element.homeTeam}` },
            { columnDef: 'location', header: 'Location', cell: (element: GameDesc) => `${element.location}` },
        ];
        this.titlebar = 'NBA';
        this.titleImg = '../../../assets/img/nba-logo.png';
    }

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.gridDatas = new Array<GameDesc>();
        const today = new Date();
        this.http
            .get('https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/daily_game_schedule.json?fordate='
                + moment(today).format('YYYYMMDD'),
                this.httpOptions)
            .subscribe(
                data => {
                    for (const item of data['dailygameschedule']['gameentry']) {
                        this.gridDatas.push({
                            date: item['date'],
                            time: item['time'],
                            homeTeam: item['homeTeam']['Abbreviation'],
                            awayTeam: item['awayTeam']['Abbreviation'],
                            location: item['location']
                        });
                    }
                    this.datagridComponent.setDatas(this.gridDatas);
                },
                error => console.log('error retrieving game datas: ' + error)
            );
    }

}
