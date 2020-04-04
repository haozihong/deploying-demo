const express = require("express"),
	  app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/about", (req, res) => {
	res.render("about");
});


app.listen(3000, _ => {
	console.log("Server listening on 3000...");
});