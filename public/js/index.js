var socket = io(); // io is a method available to us // when we call these io(); 
// it will initiating the request from the client to the server to open up a websocket to keep that connection open 
//1
socket.on('connect', ()=>{
console.log('Connected to server');

// 2.1 createMessage event
    socket.emit('createMessage',{
        to: 'vardhan@gmail.com',
        text:'Hey, This is Adi.'
    });
});

//3
socket.on('disconnect', ()=>{
console.log('Disconnected from server');
});

// creating custom event newMessage 2
socket.on('newMessage', function (message) {
console.log('New Message', message);
});