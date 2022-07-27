/*
PLAN

* done Route get checklists => gibt alle Checklisten zurück (Name) = Dashboard
* done Route get details checkliste => (Titel, Checkpoints(checked/unchecked)) + Bonus )
* done Static route für bild
* done Route post neue checklist anlegen(Titel, Checkpoints, Bild(multer))
* done Route put checken und entchecken bestehender Checkpoints
* done Route put reset checkpoints einer Liste zurück
* BONUS: Route delete checklist löschen(id + image löschen)
*/

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const { readJSON, writeJSON, deleteFile } = require("./filesystem");

const PORT = process.env.PORT || 9000;
const pathChecklist = "./checklist.json";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("image"));

const uploadImage = multer({ dest: "image" });

app.get("/", (_, res) => {
  res.send("it works...");
});

app.get("/checklists", (_, res) => {
  readJSON(pathChecklist)
  .then((checklistArray) => res.json(checklistArray));
});

app.get("/checklistdetails/:id", (req, res) => {
  const id = req.params.id;
  readJSON(pathChecklist).then((checklistArray) => {
    const chosenChecklist = checklistArray.find(
      (checklist) => checklist.id === id
    );
    if (!chosenChecklist) {
      res.status(404).send("ERROR - List not found");
    } else {
      res.json(chosenChecklist);
    }
  });
});

app.post("/createlist", uploadImage.single("titleImage"), (req, res) => {
  const titlesArray = JSON.parse(req.body.titlesArray);
  const checkPoints = titlesArray.map((title) => {
    const checkpointObject = {
      title: title,
      id: uuid(),
      checked: false,
    };
    return checkpointObject;
  });

  const newchecklist = {
    title: req.body.title,
    id: uuid(),
    imgPath: req.file.filename,
    checkPoints: checkPoints,
  };
  readJSON(pathChecklist)
  .then((checklistArray) => {
    checklistArray.push(newchecklist)
    return checklistArray
  })
  .then((updatedChecklistArray)=> {
    return writeJSON(pathChecklist, updatedChecklistArray)
  })
  .then(()=> {
    res.json(newchecklist);
  })
  .catch(err=> {
    res.status(500).send(err)
  })
});

app.put("/togglechecked/:listid/:checkpointid",(req, res)=>{
    const{listid, checkpointid}=req.params
    readJSON(pathChecklist)
    .then((checklistArray) => {
        const updatedChecklists = checklistArray.map((checklist)=>{
            if(checklist.id===listid) {
                checklist.checkPoints.map((checkpoint)=>{
                    if(checkpoint.id===checkpointid) {
                        checkpoint.checked=!checkpoint.checked
                        return checkpoint
                    }
                    else return checkpoint
                    
                })
            }
            return checklist
        })
        return updatedChecklists
    })
    .then(updatedChecklists=>{
        writeJSON(pathChecklist,updatedChecklists);
        const updatedChecklist = updatedChecklists.find(checklist => checklist.id === listid);
        res.json(updatedChecklist);
    })
})

app.put("/resetchecked/:id", (req, res)=>{
    const listid = req.params.id
    readJSON(pathChecklist)
    .then((checklistArray) => {
        const updatedChecklists = checklistArray.map((checklist)=>{
            if (checklist.id===listid) {
                checklist.checkPoints.map((checkpoint)=>{
                    checkpoint.checked=false
                    return checkpoint
                })
            }
            return checklist
        })
        return updatedChecklists
    })
    .then(updatedChecklists => {
       return writeJSON(pathChecklist,updatedChecklists)
    })
    .then(updatedChecklists => {
        const chosenChecklist = updatedChecklists.find(
          (checklist) => checklist.id === listid);
          res.json(chosenChecklist)
    })
})

app.delete("/deletelist/:id", (req, res) => {
  const listid = req.params.id
  readJSON(pathChecklist)
  .then(checklistArray => {
    const chosenChecklist = checklistArray.find(checklist => checklist.id === listid)
    deleteFile(`./image/${chosenChecklist.imgPath}`)
    return checklistArray
  })
  .then((checklistArray) => {
    const updatedChecklistArray = checklistArray.filter((checklist) => checklist.id!==listid) 
    return updatedChecklistArray
  })
  .then(updatedChecklistArray => writeJSON(pathChecklist, updatedChecklistArray))
  .then(updatedChecklistArray => res.json(updatedChecklistArray))
  .catch(err => res.json({message:"Error"}))
})


app.use((_, res) => {
  res.status(404).send("ERROR 404 - Page not found");
});

app.listen(PORT, () => console.log("Server listening on PORT", PORT));
