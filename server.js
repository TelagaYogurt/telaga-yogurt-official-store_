const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(
        "CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, flavor TEXT, price INTEGER, image TEXT, quantity INTEGER)"
    );

    db.run(
        "INSERT INTO products (name, flavor, price, image, quantity) VALUES ('Yogurt Stroberi', 'stroberi', 6000, 'yogurt_stroberi.jpg', 1)"
    );
    db.run(
        "INSERT INTO products (name, flavor, price, image, quantity) VALUES ('Yogurt Leci', 'leci', 6000, 'yogurt_leci.jpg', 1)"
    );
});

app.get("/products", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post("/addProduct", (req, res) => {
    const { name, flavor, price, image, quantity } = req.body;
    db.run(
        `INSERT INTO products (name, flavor, price, image, quantity) VALUES (?, ?, ?, ?, ?)`, [name, flavor, price, image, quantity],
        function(err) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});