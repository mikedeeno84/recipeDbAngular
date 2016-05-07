var - = require('lodash');

function User(props) {
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
}

User.prototype.santize = function() {
    return _.omit(this.toJSON(), ['password']);
};

var users = [{
    username: 'mikedeeno84@gmail.com',
    password: 'fafnir',
    email: 'barry@liNarf.com'
}, {
    username: 'garthsnow',
    password: 'sucks',
    email: 'tony@liNarf.com'
}];

module.exports = users.map(function(user) {
    return new User(user);
})
