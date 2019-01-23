const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const notFound = require("./views/notFoundPage");
const errorPage = require("./views/error")


app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

app.get('/', function (req, res) {
   res.redirect('/wiki/');
});

app.use((req,res,next) => {
   res.status(404).send(notFound());
});

app.use((err, req, res, next) => {
   console.log(err.stack)
   res.status(500).send(errorPage('Sorryn internal server error', err))
})

module.exports = app;
