import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class NbaApiService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic RnJhbmNrVzowNDA2OTI5OQ=='
        })
    };
    defaultSeason: String;
    baseUrl: String;

    constructor(private http: HttpClient) {
        this.defaultSeason = '2017-2018-regular';
        this.baseUrl = 'https://api.mysportsfeeds.com/v1.2/pull/nba/' + this.defaultSeason;
    }

    getTodayDate() {
        return moment(new Date()).format('YYYYMMDD');
    }

    getTodayGames() {
        return this.http.get(this.baseUrl + '/daily_game_schedule.json?fordate=' + this.getTodayDate(), this.httpOptions);
    }

    getAllTeamsRoster() {
        return this.http.get(this.baseUrl + '/roster_players.json?fordate=' + this.getTodayDate(), this.httpOptions);
    }

    getPlayerStats(id: Number) {
        return this.http.get(this.baseUrl + '/cumulative_player_stats.json?player=' + id, this.httpOptions);
    }

    getTeamsWL() {
        return this.http.get(this.baseUrl + '/division_team_standings.json?teamstats=W,L', this.httpOptions);
    }

    getPlayerStatsForDate(date: Date, playerId: Number) {
        const dateParam = moment(date).format('YYYYMMDD');
        return this.http.get(this.baseUrl + '/daily_player_stats.json?player=' + playerId + '&fordate=' + dateParam, this.httpOptions);
    }
}
