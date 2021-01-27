var express  = require("express");
var mongoose = require("mongoose");

var app = express();
var port = 3000;

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/notes", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (err) => {console.log(err)});
db.once("open", () => {
    console.log("Connected to database");
});

const Note = mongoose.model("Note", new mongoose.Schema({note: String}));

app.get("/notes", async (req, res) => {
    try{
        res.json(await Note.find());
    }catch(err){
        console.error(err);
    }
});

app.delete("/notes/:id", async (req, res) => {
    try{
       Note.deleteOne({_id: req.params.id}, (err) =>{
            if(err) console.error(err);
            console.log("Deleted enmtry");
        });
        res.json(await Note.find());
    }catch(err){
        console.error(err);
    }
});

app.post("/notes/:note", async (req, res) => {
    try{
        var newnote = new Note({note:req.params.note});
        newnote.save().then(() => console.log("Message saved"));
        res.json(await Note.find());
    }catch(err){
        console.error(err);
    }
});

app.patch("/notes/:id/:note", async (req, res) => {
    try{
        Note.updateOne({_id: req.params.id}, {note: req.params.note}, (err, res) => {
            if (err) console.error(err);
        });
        res.json(await Note.find());
    }catch(err){
        console.error(err);
    }
});

app.listen(port, () => {
    console.log("App ist listening on port " + port);
});