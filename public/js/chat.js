var socket = io(); // io is a method available to us // when we call these io(); 

 // scrollToBottom function 
 function scrollToBottom() {
    // Selectors
     var messages = jQuery('#messages');
     var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeigth = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeigth >= scrollHeight) {
        messages.scrollTop(scrollHeight);
   }
 }
// it will initiating the request from the client to the server to open up a websocket to keep that connection open 
//1
socket.on('connect', ()=>{
console.log('Connected to server');
var params = jQuery.deparam(window.location.search);

socket.emit('join', params, function(err) {
    if(err) {
        alert(err);
        window.location.href = '/';
    }
    else {
        console.log('No error');
    }
});

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

socket.on('updateUserList', (users)=>{
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
    console.log('users list', users);
});


// creating custom event newMessage 2
    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });
        
        jQuery('#messages').append(html);
        scrollToBottom();
    //     // console.log('New Message', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
    });

    //  new location message with anchor tag
    socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');

        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            from: message.from,
            url : message.url,
            createdAt:formattedTime
        })
        // var li = jQuery('<li></li>');
        // var a = jQuery('<a target="_blank">My Current Location</a>');
        // li.text(`${message.from} ${formattedTime}: `);
        // a.attr('href', message.url);
        // li.append(a);
        // jQuery('#messages').append(li)
        jQuery('#messages').append(html);
    });
        //4
        // socket.emit('createMessage', {
        //     from: 'Aditya',
        //     text: 'Hi'
        // }, function (resfromserver){
        //     console.log('Got it', resfromserver);
        // });

        jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();
        
        var messageTextbox = jQuery('[name=message]');
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function() {
           messageTextbox.val('')
        });
        });

        var locationButton = jQuery('#send-location');
        locationButton.on('click', function() {
            if(!navigator.geolocation)
            {
            return alert('Geolocation is not supported by your browser ');   
            }
            locationButton.attr('disabled', 'disabled').text('Sending location...');
            navigator.geolocation.getCurrentPosition(function(position){
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                });
                console.log(position);
            }, function() {
                locationButton.removeAttr('disabled').text('Send location');
                alert('Unable to fetch location.');
            });
        });