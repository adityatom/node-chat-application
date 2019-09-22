var socket = io(); // io is a method available to us // when we call these io(); 
// it will initiating the request from the client to the server to open up a websocket to keep that connection open 
//1
socket.on('connect', ()=>{
console.log('Connected to server');

// 2.1 createMessage event
    // socket.emit('createMessage',{
    //     to: 'vardhan@gmail.com',
    //     text:'Hey, This is Adi.'
    // });
});

//3
socket.on('disconnect', ()=>{
console.log('Disconnected from server');
});

// creating custom event newMessage 2
    socket.on('newMessage', function (message) {
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
    });

    //  new location message with anchor tag
    socket.on('newLocationMessage', function(message){
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My Current Location</a>');

        li.text(`${message.from}: `);
        a.attr('href', message.url);
        li.append(a);
        jQuery('#messages').append(li);
    });
//4
socket.emit('createMessage', {
    from: 'Aditya',
    text: 'Hi'
}, function (resfromserver){
    console.log('Got it', resfromserver);
});

jQuery('#message-form').on('submit', function(e) {
e.preventDefault();

socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
}, function() {
    
});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation)
    {
    return alert('Geolocation is not supported by your browser ');   
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        });
        console.log(position);
    }, function() {
        alert('Unable to fetch location.');
    })
})