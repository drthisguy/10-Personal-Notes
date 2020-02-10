const express = require('express'),
    path = require('path'),
    journal = require('./journal.json');

const app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
  });
  
  app.get("/api/notes", (req, res) => {
    return res.json(journal);
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
  });

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.title = newNote.title.replace(/\s+/g, '').toLowerCase();
  journal.push(newNote);
  res.json(journal);
})


app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});