export class Genere {
    constructor(_id = '', name = '', details = '', date = null) {
        this._id = _id;
        this.name = name;
        this.details = details;
        this.date = date;

    }

    _id: string;
    name: string;
    details: string;
    date: Date;
}
