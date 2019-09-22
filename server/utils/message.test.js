var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
    it('should generate correct message object', ()=>{

        var from = 'Adi testcase';
        var text = 'Some message';
        
        // store res in variable
        var message = generateMessage(from, text);
        // assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        
        // assert from match
        // assert text match
        expect(message).toMatchObject({from, text}); 

  
    });
}); 

describe('generateLocationMessage', () => {
    it('should generate correct location object', ()=> {
        var from = 'Aditya home';
        var latitude = 15;
        var longitude = 19;
        var url ='https://www.google.com/maps?q=15,19';

        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual({from, latitude, longitude}); 


    });
})