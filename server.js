const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    notes = require('./db/db.json');

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
  
  //serves all notes from db & reassigns id#s sequentially. 
  app.get("/api/notes", (req, res) => {
    reSortIds(notes);
    return res.json(notes)
  });

  //adds new note to db  
  app.post("/api/notes", (req, res) => {
    const newNote = req.body; 
        notes.push(newNote);
        
    try {
      (async () => {
        await fs.writeFile('db/db.json', JSON.stringify(notes), err => {
          if(err) throw err;
        })
        res.json({ Ok: true });
      })()
    } catch(err) {res.send(err)}
  });

  //removes note from db
  app.delete("/api/notes/:id", (req, res) => {
    const pos = req.params.id - 1;
      notes.splice(pos, 1);

    try {
      (async () => {
        await fs.writeFile('db/db.json', JSON.stringify(notes), err => {
          if(err) throw err;
        })
        res.json({ Ok: true });
      })()
    } catch(err) {res.send(err)}
 });

  //reorder all id#s sequentially after deletes/post.
  function reSortIds(arr) {
    for (let i = 0; i < arr.length; i++) {
          arr[i].id = i+1;
    }
    return arr
  }

  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });

 