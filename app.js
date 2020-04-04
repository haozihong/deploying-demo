const express = require("express"),
	  app = express(),
	  PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/about", (req, res) => {
	res.render("about");
});


app.listen(PORT, _ => {
	console.log(`Listening on ${PORT}...`);
});