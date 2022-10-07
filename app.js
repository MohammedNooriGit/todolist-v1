const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Cook Food", "Buy Milk", "Wash Dishes"];
let workList = [];

app.get("/", function (req, res) {
  let today = new Date();

  let day = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let kindOfDay = today.toLocaleDateString("en-US", day);

  res.render("list", { listType: kindOfDay, items: items });
});

app.post("/", function (req, res) {
  let listItem = req.body.toDoItem;

  if (req.body.list === "Work list") {
    workList.push(listItem);
    res.redirect("/work");
  } else {
    items.push(listItem);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listType: "Work list", items: workList });
});

app.get("/about", function (req, res) {
  res.render("about.ejs");
});

app.listen(port, function () {
  console.log("Server is up and running on port: " + port);
});
