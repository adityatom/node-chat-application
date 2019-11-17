/* 
Created By: N.Adityavardhan
Desc: Application server and connection with express middleware
heroku :  https://cryptic-ridge-70407.herokuapp.com/
*/

const path = require("path");
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validation');

const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express(); // we use express to make our webserver

var server = http.createServer(app); // creating http server
var io = socketIO(server); // configure the server to use socketIO

var users = new Users(); // instance
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
        // socket.emit('newMessage', {
        //     from: 'Admin',
        //     text:'Welcome to the chat app',
        //     createdAt: new Date().getTime()
        // });

        // replace task1
        //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //task2 : socket.broadcast.emit from Admin text New user joined
        // socket.broadcast.emit('newMessage', {
        //     from: 'Admin',
        //     text: 'New user joined',
        //     createdAt: new Date().getTime()
        // });


        // replace task2
        // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

        // join in to room
        socket.on('join', (params, callback) => {
            if(!isRealString(params.name) || !isRealString(params.room)) {
              return callback('Name and room name are required.');
            }

            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            // socket.leave(params.room);
            
            // io.emit -> io.to('office room').emit
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            //socket.broadcast.emit -> socket.broadcast.to('office room').emit

            //socket.emit -> 

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

            callback();
        });

        socket.on('createMessage', (newMessage, callback)=>{
            console.log('createMessage', newMessage);

            // Now Broadcast Events  task4
            /* 
            For broadcast events we use io.emit()
            socket.emit() = emits an event to a single connection
            io.emit () = emits an event to every single connection
            */
        //    io.emit('newMessage', {
        //        from: newMessage.from,
        //        text: newMessage.text,
        //        createdAt: new Date().getTime()
        //    });


        //replace task4
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback();
           /*We can use broadcast to broadcast messages to all receivers except sender 
           by using this method  socket.broadcast.emit('', {}); 
           
           socket.broadcast.emit('newMessage', {from: 'A', text:'Good morning all', createdAt: new Date().getTime() })*/

        });
        
        // creating location message
        socket.on('createLocationMessage', (coords)=> {
            io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        });
        socket.on('disconnect', ()=>{
            var user = users.removeUser(socket.id);
            if (user) {
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            }
            console.log('User was disconnected');
        });
    }); 
    
 
// for heroku dynos we need to use process.env.PORT directly in app.listen
// express uses builtin node_module called http uses(http.createServer()) to built this server 
// now change from app.listen to server.listen
server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
