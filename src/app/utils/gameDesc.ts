export class GameDesc {
    date: Date;
    time: String;
    homeTeam: String;
    awayTeam: String;
    location: String;

    constructor(date: Date, time: String, homeTeam: String, awayTeam: String, location: String) {
        this.date = date;
        this.time = time;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.location = location;
    }
}
