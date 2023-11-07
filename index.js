import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

app.set("view engine", "ejs");

const newItems = [];

let options = {weekday:'long',year:'numeric', month:'long',day:'numeric'};
let today =new Date();
let day = today.toLocaleDateString("en-US",options);

app.get('/', function(req, res) {
  res.render('home', { kindOfDay:day,todos: newItems });
});

app.post('/add', function(req, res) {
  const task = req.body.task;
  newItems.push({ id: Date.now(), task: task });
  res.redirect('/');
});


app.post('/delete', function(req, res) {
  const id = req.body.id;
  for (let i = 0; i < newItems.length; i++) {
    if (newItems[i].id == id) {
      newItems.splice(i, 1);
      break;
    }
  }
  res.redirect('/');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });