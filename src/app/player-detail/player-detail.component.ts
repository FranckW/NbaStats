import { Component, ViewChild } from '@angular/core';
import { Player } from '../utils/player';
import { NbaApiService } from '../utils/nba-api.service';
import { DatagridComponentComponent } from '../datagrid-component/datagrid-component.component';
import { PlayerStats } from '../utils/player-stats';

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
    statsDatas: Array<PlayerStats>;

    constructor(private nbaApi: NbaApiService) {
        this.player = new Player();
        this.showSpinner = false;
        this.statsColumns = [
            { columnDef: 'timeUnit', header: '', cell: (element: PlayerStats) => element.timeUnit },
            { columnDef: 'mpg', header: 'MPG', cell: (element: PlayerStats) => element.player.mpg },
            { columnDef: 'fgpercent', header: 'FG%', cell: (element: PlayerStats) => element.player.fgpercent },
            { columnDef: 'threepercent', header: '3P%', cell: (element: PlayerStats) => element.player.threepercent },
            { columnDef: 'ftpercent', header: 'FT%', cell: (element: PlayerStats) => element.player.ftpercent },
            { columnDef: 'ppg', header: 'PPG', cell: (element: PlayerStats) => element.player.ppg },
            { columnDef: 'orpg', header: 'ORPG', cell: (element: PlayerStats) => element.player.orpg },
            { columnDef: 'drpg', header: 'DRPG', cell: (element: PlayerStats) => element.player.drpg },
            { columnDef: 'rpg', header: 'RPG', cell: (element: PlayerStats) => element.player.rpg },
            { columnDef: 'apg', header: 'APG', cell: (element: PlayerStats) => element.player.apg },
            { columnDef: 'spg', header: 'SPG', cell: (element: PlayerStats) => element.player.spg },
            { columnDef: 'bpg', header: 'BPG', cell: (element: PlayerStats) => element.player.bpg },
            { columnDef: 'topg', header: 'TOPG', cell: (element: PlayerStats) => element.player.topg },
        ];
    }

    setPlayer(player: Player) {
        this.player = player;
        this.dataLoaded = false;
        this.showSpinner = true;
        this.datagridComponent = new DatagridComponentComponent();
        this.nbaApi.getPlayerStats(player.id)
            .subscribe(
                data => {
                    const stats = data['cumulativeplayerstats']['playerstatsentry'][0]['stats'];
                    this.player.apg = stats['AstPerGame']['#text'];
                    this.player.mpg = Math.round(stats['MinSecondsPerGame']['#text'] / 60 * 10) / 10;
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
                    const seasonStats = new PlayerStats();
                    seasonStats.player = player;
                    seasonStats.timeUnit = 'Season';
                    const dateParam = new Date();
                    let historyApg = 0;
                    let historyMpg = 0;
                    let historyPpg = 0;
                    let historyRpg = 0;
                    let historyOrpg = 0;
                    let historyDrpg = 0;
                    let historySpg = 0;
                    let historyTopg = 0;
                    let historyBpg = 0;
                    let historyFgpercent = 0;
                    let historyThreepercent = 0;
                    let historyFtpercent = 0;
                    let nbGamesPlayed = 0;
                    let maxIndex = 1;
                    for (let i = 1; i < 11; i++) {
                        dateParam.setDate(new Date().getDate() - i);
                        this.nbaApi.getPlayerStatsForDate(dateParam, player.id)
                            .subscribe(
                                data2 => {
                                    if (data2['dailyplayerstats']['playerstatsentry']) {
                                        const historyStats = data2['dailyplayerstats']['playerstatsentry'][0]['stats'];
                                        historyApg += Number(historyStats['AstPerGame']['#text']);
                                        historyMpg += Math.round(historyStats['MinSecondsPerGame']['#text'] / 60 * 10) / 10;
                                        historyPpg += Number(historyStats['PtsPerGame']['#text']);
                                        historyRpg += Number(historyStats['RebPerGame']['#text']);
                                        historyOrpg += Number(historyStats['OffRebPerGame']['#text']);
                                        historyDrpg += Number(historyStats['DefRebPerGame']['#text']);
                                        historySpg += Number(historyStats['StlPerGame']['#text']);
                                        historyTopg += Number(historyStats['TovPerGame']['#text']);
                                        historyBpg += Number(historyStats['BlkPerGame']['#text']);
                                        historyFgpercent += Number(historyStats['Fg2PtPct']['#text']);
                                        historyThreepercent += Number(historyStats['Fg3PtPct']['#text']);
                                        historyFtpercent += Number(historyStats['FtPct']['#text']);
                                        nbGamesPlayed++;
                                    }
                                    const historyPlayer = new Player();
                                    if (nbGamesPlayed === 0) {
                                        nbGamesPlayed = 1;
                                    }
                                    historyPlayer.apg = Math.round(historyApg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.mpg = Math.round(historyMpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.ppg = Math.round(historyPpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.rpg = Math.round(historyRpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.orpg = Math.round(historyOrpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.drpg = Math.round(historyDrpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.spg = Math.round(historySpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.topg = Math.round(historyTopg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.bpg = Math.round(historyBpg / nbGamesPlayed * 10) / 10;
                                    historyPlayer.fgpercent = Math.round(historyFgpercent / nbGamesPlayed * 10) / 10;
                                    historyPlayer.threepercent = Math.round(historyThreepercent / nbGamesPlayed * 10) / 10;
                                    historyPlayer.ftpercent = Math.round(historyFtpercent / nbGamesPlayed * 10) / 10;
                                    const lastTenDaysStats = new PlayerStats();
                                    lastTenDaysStats.player = historyPlayer;
                                    lastTenDaysStats.timeUnit = 'Last 10 days';
                                    if (i >= maxIndex) {
                                        maxIndex = i;
                                        this.statsDatas = new Array<PlayerStats>();
                                        this.statsDatas.push(seasonStats);
                                        this.statsDatas.push(lastTenDaysStats);
                                        this.datagridComponent.setDatas(this.statsDatas);
                                    }
                                },
                                error => {
                                    console.log('error retrieving player history on last 10 days');
                                    console.log(error);
                                }
                            );
                    }
                    this.dataLoaded = true;
                    this.showSpinner = false;
                },
                error => {
                    console.log('error retrieving player details');
                    console.log(error);
                }
            );
    }

    setSpinner(value: Boolean) {
        this.showSpinner = value;
    }
}
