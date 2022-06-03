const lbDesck  =document.querySelector('h1');
const btnAttend =document.querySelector('button');
const lbTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio')){
    window.location='index.html'
    throw new Error('El escritorio es obligatorio');
}

const desk =searchParams.get('escritorio');
lbDesck.innerText =desk;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('last-ticket', (last) => {

})

btnAttend.addEventListener( 'click', () => {
   socket.emit('attend-ticket', {desk}, ({ok,ticket,msg}) =>{
       if (!ok) {
           lbTicket.innerText ='Nadie';
           return divAlert.style.display ='';
       }

       lbTicket.innerText ='Ticket' + ticket.number;

   });
});