const express = require("express"),
	  app = express(),
	  PORT = process.env.PORT || 3000;

const munsell = require("munsell");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/api/color/hex-to-munsell/:clr", (req, res) => {
	let hex = "#"+req.params.clr;
	let digits = 1;
	if (req.query.digits) digits = req.query.digits;
	let conver = munsell.hexToMunsell(hex, undefined, digits);
	let rgbBack = munsell.munsellToRgb(conver);
	let hexBack = munsell.munsellToHex(conver);
	console.log(conver);
	res.status(200).json({
		ori_hex: hex,
		digits: digits,
		munsell : conver,
		rgb_back: rgbBack,
		hex_back: hexBack
	});
});

app.get("/color/hex-to-munsell/:clr", (req, res) => {
	let hex = "#"+req.params.clr;
	let digits = 1;
	if (req.query.digits) digits = req.query.digits;
	let conver = munsell.hexToMunsell(hex, undefined, digits);
	let rgbBack = munsell.munsellToRgb(conver);
	let hexBack = munsell.munsellToHex(conver);
	console.log(conver);
	result = {
		ori_hex: hex,
		digits: digits,
		munsell : conver,
		rgb_back: rgbBack,
		hex_back: hexBack
	};
	res.render("color", { result: result });
	// res.status(200).json({
	// 	ori_hex: hex,
	// 	digits: digits,
	// 	munsell : conver,
	// 	rgb_back: rgbBack,
	// 	hex_back: hexBack
	// });
});

app.get("/color-convert", (req, res) => {
	console.log(req.query);
	let result = null;
	if (req.query.mode) {
		let oriSys, oriClr, oriCSSClr, convert, digits, clrBack;
		switch (req.query.mode){
			case "hex_to_munsell":
				oriSys = "hex";
				oriClr = "#"+req.query.ori_clr;
				oriCSSClr = oriClr;
				digits = req.query.digits || 1;
				convert = munsell.hexToMunsell(oriClr, undefined, digits);
				clrBack = munsell.munsellToHex(convert);
				break;
			case "rgb255_to_munsell":
				oriSys = "rgb255";
				oriClr = [Number(req.query.ori_clr_r), Number(req.query.ori_clr_g), Number(req.query.ori_clr_b)];
				oriCSSClr = `rgb(${oriClr})`;
				digits = req.query.digits || 1;
				convert = munsell.rgb255ToMunsell(oriClr[0], oriClr[1], oriClr[2], undefined, digits);
				clrBack = munsell.munsellToRgb255(convert);
				break;
			case "rgb_to_munsell":
				oriSys = "rgb";
				oriClr = [Number(req.query.ori_clr_r), Number(req.query.ori_clr_g), Number(req.query.ori_clr_b)];
				oriCSSClr = `rgb(${oriClr[0]*255}, ${oriClr[1]*255}, ${oriClr[2]*255})`;
				digits = req.query.digits || 1;
				convert = munsell.rgbToMunsell(oriClr[0], oriClr[1], oriClr[2], undefined, digits);
				clrBack = munsell.munsellToRgb(convert);
		}
		let rgbBack = munsell.munsellToRgb(convert);
		let hexBack = munsell.munsellToHex(convert);
		result = {
			ori_sys: oriSys,
			ori_clr: oriClr,
			ori_css_clr: oriCSSClr,
			digits: digits,
			convert_sys: "munsell",
			convert_clr: convert,
			convert_back: clrBack,
			hex_back: hexBack,
			rgb_back: rgbBack,
			rgb255_back: rgbBack.map(v => Math.round(v*255))
		};
		console.log(result);
	}
	res.render("color", { result: result });
});


app.listen(PORT, _ => {
	console.log(`Listening on ${PORT}...`);
});