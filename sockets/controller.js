const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('last-ticket',ticketControl.last);

    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback( next );

        
    })

    socket.on('attend-ticket', ({desk},callback) =>{
        if (!desk) {
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicket(desk);
        if (!ticket) {
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes' 
            });
        }else {
            callback({
                ok:true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

