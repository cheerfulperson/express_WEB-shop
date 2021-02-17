const session = require('express-session');
// подключение сессии к БД
const MSSQLStore = require('express-mysql-session')(session);

module.exports = { 
    createStore: function() {
        let config = {
            host: "localhost",
            user: "root",
            database: "firstbd",
            password: "root",
        }
        return new MSSQLStore(config);
    }
}