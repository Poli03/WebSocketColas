const path = require('path');
const fs   = require('fs');

class TicketControl {
    constructor(){
        this.last =0;
        this.today= new Date().getDate();
        this.tickets = [];
        this.last4 =[];

        this.init();
    }

    get toJson(){
        return {
            last:this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    init(){
        const {today,last,tickets, last4} =require('../db/data.json');
        if (today === this.today) {
            this.last= last; 
            this.tickets= tickets;
            this.last4= last4;
        }else{
            this.saveDB();
        }
    }

    saveDB(){
        const dbPath =path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJson));
    }
}

module.exports =TicketControl;