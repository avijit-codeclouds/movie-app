export class Wishlist {
        constructor(_id = '', user = '', movies = null, date = null) {
            this._id = _id;
            this.user = user;
            this.movies = movies;
            this.date = date;
    
        }
    
        _id: string;
        user: string;
        movies:any;
        date: Date;
    }
