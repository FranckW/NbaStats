import { Component } from '@angular/core';
import { Player } from '../utils/player';
import { NbaApiService } from '../utils/nba-api.service';

@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.component.html',
    styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent {
    player: Player;
    showSpinner: Boolean;
    dataLoaded: Boolean;

    constructor(private nbaApi: NbaApiService) {
        this.player = new Player();
        this.showSpinner = false;
    }

    setPlayer(player: Player) {
        this.player = player;
        this.dataLoaded = true;
        this.nbaApi.getPlayerStats(player.id)
            .subscribe(
                data => {
                    const stats = data['cumulativeplayerstats']['playerstatsentry'][0]['stats'];
                    console.log(stats);
                    this.player.apg = stats['AstPerGame']['#text'];
                    this.player.mpg = stats['MinSecondsPerGame']['#text'] / 60;
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
