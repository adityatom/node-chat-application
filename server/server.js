/* 
Created By: N.Adityavardhan
Desc: Application server and connection with express middleware
heroku :  https://cryptic-ridge-70407.herokuapp.com/
*/

const path = require("path");
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express(); // we use express to make our webserver

var server = http.createServer(app); // creating http server
var io = socketIO(server); // configure the server to use socketIO

app.use(express.static(publicPath)); // configuring middle ware

/* let's you register an event listener, connection is used for client-server
callback function argument (socket) */

    io.on('connection', (socket)=>{
        console.log('New User Connected');
        
        /* calling a socket method emit()
        we use emit on both client and server side to emit events
       emit is very similar to listeners
       Here, instead of listening to event we are creating the custom event
        */
        // socket.emit('newMessage', {
        //     from: 'Aditya@gmail.com',
        //     text:'Hey, what is going on',
        //     createdAt: 343
        // });

        //task1 : socket.emit from Admin text Welcome to the chat app
        socket.emit('newMessage', {
            from: 'Admin',
            text:'Welcome to the chat app',
            createdAt: new Date().getTime()
        });
        //task2 : socket.broadcast.emit from Admin text New user joined
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'New user joined',
            createdAt: new Date().getTime()
        })
        socket.on('createMessage', (newMessage)=>{
            console.log('createMessage', newMessage);

            // Now Broadcast Events 
            /* 
            For broadcast events we use io.emit()
            socket.emit() = emits an event to a single connection
            io.emit () = emits an event to every single connection
            */
           io.emit('newMessage', {
               from: newMessage.from,
               text: newMessage.text,
               createdAt: new Date().getTime()
           });

           /*We can use broadcast to broadcast messages to all receivers except sender 
           by using this method  socket.broadcast.emit('', {}); 
           
           socket.broadcast.emit('newMessage', {from: 'A', text:'Good morning all', createdAt: new Date().getTime() })*/

        });
        
        socket.on('disconnect', ()=>{
            console.log('User was disconnected');
        });
    }); 
    
 
// for heroku dynos we need to use process.env.PORT directly in app.listen
// express uses builtin node_module called http uses(http.createServer()) to built this server 
// now change from app.listen to server.listen
server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
