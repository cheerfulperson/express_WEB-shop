const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "firstbd",
    password: "root"
});

app.set("view engine", "hbs");

// получение списка пользователей
app.get('/', (req, res) => {
    pool.query('SELECT * FROM orderlist', (err, results) => {
        if (err) return console.log(err);
        res.render("index.hbs", {
            orderlist: results
        });
        console.log(results)
    });
});


app.get("/create", function (req, res) {
    res.render("create.hbs");
});

// create
app.post('/create', urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    pool.query(`INSERT INTO orderlist(name, description, price) VALUES (?,?,?)`, [name, description, price], function (err, data) {

        if (err) return console.log(err);
        res.redirect("/");
    });
})

// Создаем маршрут edit
app.get("/edit/:id", function (req, res) {
    const id = req.params.id;

    pool.query("SELECT * FROM orderlist WHERE id=?", [id], function (err, data) {
        if (err) return console.log(err);
        res.render("edit.hbs", {
            orderlist: data[0]
        });
    });
});

// Edit
app.post('/edit', urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const id = req.body.id;


    pool.query(`UPDATE orderlist SET name=?, description=?, price=? WHERE id=? `, [name, description, price, id], (err, results) => {
    console.log(name)
    console.log(description)
    console.log(price)
    console.log(id)



        if (err) return console.log(err);
        res.redirect('/')
    });
});

// Delete
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM orderlist where id=?', [id], (err, results) => {
        if (err) return console.log(err);
        res.redirect("/");
    });

});


// Прослушка FBI
app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});