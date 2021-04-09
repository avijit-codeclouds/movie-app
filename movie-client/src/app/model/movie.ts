export class Movie {
    constructor(_id = '', title = '', stocks = '', genre = '', rate = ' ',isChecked='', date = null) {
        this._id = _id;
        this.title = title;
        this.genre = genre;
        this.stocks = stocks
        this.rate = rate;
        this.isChecked=isChecked;
        this.date = date;

    }

    _id: string;
    title: string;
    stocks: string;
    rate: string;
    genre: string;
    isChecked:string;
    date: Date;
}

