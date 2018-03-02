import { Component, ViewChild } from '@angular/core';
import { Player } from '../utils/player';
import { NbaApiService } from '../utils/nba-api.service';
import { DatagridComponentComponent } from '../datagrid-component/datagrid-component.component';

@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.component.html',
    styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent {
    player: Player;
    showSpinner: Boolean;
    dataLoaded: Boolean;
    @ViewChild(DatagridComponentComponent) datagridComponent;
    statsColumns: Array<Object>;
    statsDatas: Array<Player>;

    constructor(private nbaApi: NbaApiService) {
        this.player = new Player();
        this.showSpinner = false;
        this.statsColumns = [
            { columnDef: 'mpg', header: 'MPG', cell: (element: Player) => `${element.mpg}` },
            { columnDef: 'fgpercent', header: 'FG%', cell: (element: Player) => `${element.fgpercent}` },
            { columnDef: 'threepercent', header: '3P%', cell: (element: Player) => `${element.threepercent}` },
            { columnDef: 'ftpercent', header: 'FT%', cell: (element: Player) => `${element.ftpercent}` },
            { columnDef: 'ppg', header: 'PPG', cell: (element: Player) => `${element.ppg}` },
            { columnDef: 'orpg', header: 'ORPG', cell: (element: Player) => `${element.orpg}` },
            { columnDef: 'drpg', header: 'DRPG', cell: (element: Player) => `${element.drpg}` },
            { columnDef: 'rpg', header: 'RPG', cell: (element: Player) => `${element.rpg}` },
            { columnDef: 'apg', header: 'APG', cell: (element: Player) => `${element.apg}` },
            { columnDef: 'spg', header: 'SPG', cell: (element: Player) => `${element.spg}` },
            { columnDef: 'bpg', header: 'BPG', cell: (element: Player) => `${element.bpg}` },
            { columnDef: 'topg', header: 'TOPG', cell: (element: Player) => `${element.topg}` },
        ];
    }

    setPlayer(player: Player) {
        this.player = player;
        this.dataLoaded = true;
        this.nbaApi.getPlayerStats(player.id)
            .subscribe(
                data => {
                    this.statsDatas = new Array<Player>();
                    const stats = data['cumulativeplayerstats']['playerstatsentry'][0]['stats'];
                    console.log(stats);
                    this.player.apg = stats['AstPerGame']['#text'];
                    this.player.mpg = Math.round(stats['MinSecondsPerGame']['#text'] / 60 * 100) / 100;
                    this.player.ppg = stats['PtsPerGame']['#text'];
                    this.player.rpg = stats['RebPerGame']['#text'];
                    this.player.orpg = stats['OffRebPerGame']['#text'];
                    this.player.drpg = stats['DefRebPerGame']['#text'];
                    this.player.spg = stats['StlPerGame']['#text'];
                    this.player.topg = stats['TovPerGame']['#text'];
                    this.player.bpg = stats['BlkPerGame']['#text'];
                    this.player.fgpercent = stats['Fg2PtPct']['#text'];
                    this.player.threepercent = stats['Fg3PtPct']['#text'];
                    this.player.ftpercent = stats['FtPct']['#text'];
                    console.log(player);
                    // todo tableau avec une ligne saison, une ligne 5 derniers matchs
                    this.statsDatas.push(player);
                    this.datagridComponent.setDatas(this.statsDatas);
                },
                error => {
                    console.log('error retrieving roasters');
                    console.log(error);
                }
            );
    }

    setSpinner(on: Boolean) {
        this.showSpinner = on;
    }
}
