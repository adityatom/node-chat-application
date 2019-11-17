[{
    id: '34343434',
    name: 'Aditya',
    room: 'office room'
}]

// removeUser(id)
// getUser(id)
//getUserList(room)

// addUser(id, name, room)
class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    // removeUser(id)
    removeUser (id) {
        // return user that was removed
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        
        return namesArray;
    }
}

module.exports = {Users};
// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me  = new Person('Aditya', 25);
