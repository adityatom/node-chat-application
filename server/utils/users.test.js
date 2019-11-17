const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users =[{
            id : '1',
            name: 'Aditya',
            room: 'chat room'
        }, {
            id: '2',
            name:'vardhan',
            room: 'office room'
        }, {
            id: '3',
            name: 'jan',
            room: 'family room'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Aditya',
            room: 'Office room'
        };
        var resUser = users.addUser(user.id, user.name, user.rrom)

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId ='1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', ()=> {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', ()=> {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user  = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return names for chat room', () => {
        var userList = users.getUserList('chat room');
        expect(userList).toEqual(['Aditya', 'jan']);
    });

    it('should return names for office room', () => {
        var userList = users.getUserList('chat room');
        expect(userList).toEqual(['vardhan']);
    });

    it('should return names for family room', () => {
        var userList = users.getUserList('chat room');
        expect(userList).toEqual(['jan']);
    });
});