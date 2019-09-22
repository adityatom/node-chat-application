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

        socket.on('disconnect', ()=>{
            console.log('User was disconnected');
        });
    }); 
    


// app.listen(PORT, ()=> {
//     console.log(`Server is up on ${PORT}`);
// });

// for heroku dynos we need to use process.env.PORT directly in app.listen
// express uses builtin node_module called http uses(http.createServer()) to built this server 
// now change from app.listen to server.listen
server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
