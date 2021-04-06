export class Movie {
    constructor(_id = '', title = '', stocks = null, genere_id = '', rate = null, date = null) {
        this._id = _id;
        this.title = title;
        this.genere_id = genere_id;
        this.stocks = stocks
        this.rate = rate;
        this.date = date;

    }

    _id: string;
    title: string;
    stocks: number;
    rate: number;
    genere_id: string;
    date: Date;
}

