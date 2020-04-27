const Sequelize = require('sequelize');
const passwordHash = require('password-hash');
var db = require('./db');

var User = db.define('User', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING, allowNull: false, allowEmpty: false },
    password: { type: Sequelize.STRING, allowNull: false, allowEmpty: false },
    email: { type: Sequelize.STRING, allowNull: false, allowEmpty: false },
    confirmado: { type: Sequelize.BOOLEAN, defaultValue: false }
})


User.beforeCreate((user) => {
    user.password = passwordHash.generate(user.password);
})

User.prototype.validPassword = (password, passwordDB, done, user) => {
    if (passwordHash.verify(password, passwordDB)) {
        return true
    }
    return false
}
module.exports = User;