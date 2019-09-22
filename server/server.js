/* 
Created By: N.Adityavardhan
Desc: Application server and connection with express middleware
*/

const path = require("path");
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

// app.listen(PORT, ()=> {
//     console.log(`Server is up on ${PORT}`);
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
