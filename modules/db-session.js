const session = require('express-session');
// подключение сесси к БД
const MSSQLStore = require('express-mysql-session')(session);

module.exports = {
    createStore: function() {
        let config = {
            host: "localhost",
            user: "root",
            database: "users_info",
            password: "root",
        }
        return new MSSQLStore(config);
    }
}