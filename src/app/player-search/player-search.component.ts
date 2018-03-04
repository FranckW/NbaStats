import { Component, ViewChild, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { Player } from '../utils/player';
import { NbaApiService } from '../utils/nba-api.service';

@Component({
    selector: 'app-player-search',
    templateUrl: './player-search.component.html',
    styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
    @ViewChild(PlayerDetailComponent) playerDetailComponent;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic RnJhbmNrVzowNDA2OTI5OQ=='
        })
    };
    allRoasters: Array<Object>;

    constructor(private nbaApi: NbaApiService) {
        this.allRoasters = new Array<Object>();
    }

    ngOnInit() {
        this.getRoasters();
    }

    getRoasters() {
        if (this.allRoasters.length === 0) {
            this.nbaApi.getAllTeamsRoster()
                .subscribe(
                    data => {
                        this.allRoasters = data['rosterplayers']['playerentry'];
                    },
                    error => {
                        console.log('error retrieving roasters');
                        console.log(error);
                    }
                );
        }
        return this.allRoasters;
    }

    searchPlayer(searchText: String) {
        this.playerDetailComponent.setSpinner(true);
        const player = new Player();
        for (const item of this.getRoasters()) {
            const itemPlayer = item['player'];
            if (itemPlayer['FirstName'].toLowerCase() + ' ' + itemPlayer['LastName'].toLowerCase() === searchText.toLowerCase()) {
                player.id = itemPlayer['ID'];
                player.age = itemPlayer['Age'];
                player.firstName = itemPlayer['FirstName'];
                player.lastName = itemPlayer['LastName'];
                player.height = itemPlayer['Height'];
                player.weight = itemPlayer['Weight'];
                player.position = itemPlayer['Position'];
                player.jerseyNumber = itemPlayer['JerseyNumber'];
                player.birthCountry = itemPlayer['BirthCountry'];
                player.birthDate = itemPlayer['BirthDate'];
                player.birthCity = itemPlayer['BirthCity'];
                player.team = item['team']['Abbreviation'];
            }
        }
        this.playerDetailComponent.setSpinner(false);
        this.playerDetailComponent.setPlayer(player);
    }

}
