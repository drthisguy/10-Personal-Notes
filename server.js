const express = require('express'),
    path = require('path'),
    journal = require('./journal.json');

const app = express(),
    PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
  });
  

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
  });
  

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});