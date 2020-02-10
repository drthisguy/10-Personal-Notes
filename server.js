const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    journal = require('./journal.json');

const app = express(),
    PORT = process.env.PORT || 3000;

  //Set up the express app
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  //serves main page
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
  });

  //serves note taking page
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
  });
  
  //serves all notes from db
  app.get("/api/notes", (req, res) => {
    return res.json(journal);
  });

  //adds new note to db  
  app.post("/api/notes", (req, res) => {
    let newNote = req.body;
      newNote.title = newNote.title.toLowerCase().replace(/\s+/g, '');
      journal.push(newNote);

      (async () => {
        await fs.writeFile('journal.json', JSON.stringify(journal), err => {
          if(err) throw err;
        })
      })()
    res.json({ Ok: true });
  });

  //removes note from db
  app.delete("/api/notes/:title", (req, res) => {
    const removed = req.params.title,
      pos = journal.findIndex( i => i.title === removed);
      journal.splice(pos, 1);

      (async () => {
        await fs.writeFile('journal.json', JSON.stringify(journal), err => {
          if(err) throw err;
        })
      })()
    res.json({ Ok: true });
  })


app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});