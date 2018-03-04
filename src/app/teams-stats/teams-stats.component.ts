import { Component, ViewChild, OnInit } from '@angular/core';
import { NbaApiService } from '../utils/nba-api.service';
import { DatagridComponentComponent } from '../datagrid-component/datagrid-component.component';
import { TeamStats } from '../utils/teamsstats';

@Component({
    selector: 'app-teams-stats',
    templateUrl: './teams-stats.component.html',
    styleUrls: ['./teams-stats.component.css']
})
export class TeamStatsComponent implements OnInit {
    showSpinner: Boolean;
    @ViewChild(DatagridComponentComponent) datagridComponent;
    statsColumns: Array<Object>;
    statsDatas: Array<TeamStats>;

    constructor(private nbaApi: NbaApiService) {
        this.showSpinner = false;
        this.statsColumns = [
            { columnDef: 'team', header: 'Team', cell: (element: TeamStats) => element.name },
            { columnDef: 'w', header: 'W', cell: (element: TeamStats) => element.w },
            { columnDef: 'l', header: 'L', cell: (element: TeamStats) => element.l },
        ];
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.showSpinner = true;
        this.nbaApi.getTeamsWL()
            .subscribe(
                data => {
                    this.statsDatas = new Array<TeamStats>();
                    for (const team of data['divisionteamstandings']['division']) {
                        for (const stats of team['teamentry']) {
                            const teamStats = new TeamStats();
                            teamStats.id = stats['team']['ID'];
                            teamStats.name = stats['team']['Abbreviation'];
                            teamStats.w = stats['stats']['Wins']['#text'];
                            teamStats.l = stats['stats']['Losses']['#text'];
                            this.statsDatas.push(teamStats);
                        }
                    }
                    // TODO chopper les stats des 10 derniers jours
                    this.datagridComponent.setDatas(this.statsDatas);
                    this.showSpinner = false;
                },
                error => {
                    console.log('error retrieving team stats');
                    console.log(error);
                }
            );
    }
}
