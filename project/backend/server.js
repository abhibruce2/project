const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const { database } = require("pg/lib/defaults");
const { response } = require("express");
const PORT = 5000;
// const values = [name, continent, id]
const pool = new pg.Pool({
  port: 5432,
  password: "password",
  database: "Abhi",
  host: "localhost",
  user: "postgres",
  max: 10,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/post", function (request, response) {
  const id = request.body.activeId;
  const link = request.body.link;
  const status = request.body.status;
  const comment = request.body.comment || null;
  const values = [id, link, status, comment];

  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "INSERT INTO client (id, link, status, comment) VALUES($1, $2, $3, $4) RETURNING *",
        [...values],
        (err, result) => {
          done();
          if (err) {
            console.log("err-", err);
            return response.status(400).send({ err });
          } else {
            console.log("DATA INSERTED");
            db.end();
            response.status(201).send({ message: "Data inserted!" });
          }
        }
      );
    }
  });
});

app.get("/api/list", function (request, response) {
  pool.connect(function (err, db, done) {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * FROM client", (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          console.log("its Done");
          return response.status(200).send(table);
        }
      });
    }
  });
});

app.put("api/update/:id", function (req, res) {
  const id = req.params.id;
  let link = req.body.link;
  let status = req.body.status;
  let comment = req.body.comment;

  pool.query(
    "UPDATE client SET id = $1 , link = $2, status= $3, comment= $4",
    [id, link, status, comment],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(`User Modified With Id: ${id}`);
      }
    }
  );
});

app.delete("/api/remove/:id", function (request, response) {
  let id = request.params.id;
  pool.connect(function (err, db, done) {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "DELETE FROM client WHERE country.id = $1",
        [Number(id)],
        function (err, result) {
          if (err) {
            return response.status(400).send(err);
          } else {
            return response.status(200).send({ message: "Success" });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("Listening on Port" + PORT));
