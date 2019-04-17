// Require stuff

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	app = express(),
	methodOverride = require('method-override');

// Require timer module
var Timer = require('easytimer.js').Timer;
var timer = new Timer();

// Create a LifxLan object
const Lifx  = require('node-lifx-lan');

var artyom = require("artyom.js");

//mongoose.connect('mongodb://localhost:27017/time_tracker', {useNewUrlParser: true});

// App configuration
// Set view engine
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Prevents MIME error when styling with css files
app.use(express.static(__dirname + '/public'));

// Create a mongoose schema for styles
/*var styleSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String
});*/

// Configure schema model
//var StyleCard = mongoose.model("StyleCard", styleSchema);
 
// Turn on all LIFX bulbs in the local network

function lighton() {
Lifx.discover().then(() => {
   Lifx.turnOnFilter({ // return 
    filters: [{
      group: {label: 'Office'},
    }]
  });
}).then(() => {
  console.log('Done!');
}).catch((error) => {
  console.error(error);
});
}

function lightoff() {
	Lifx.discover().then(() => {
   		Lifx.turnOffFilter({ // return 
    	filters: [{
      	group: {label: 'Office'},
    		}]
  		});
	}).then(() => {
	  console.log('Done!');
	}).catch((error) => {
	  console.error(error);
	});
}

function lightdown() {
Lifx.discover({wait:3000}).then((device_list) => {
  let dev = device_list[0];
  return dev.setColor({
    color: {
      hue: 0.5,
      saturation: 1.0,
      brightness: 0.7,
      kelvin: 1500
    },
    duration: 3000
  });
}).then(() => {
  console.log('Done!');
}).catch((error) => {
  console.error(error);
});
}

function whitelight() {
	Lifx.discover({wait:3000}).then((device_list) => {
  let dev = device_list[0];
  return dev.setColor({
    color: {
      hue: 1.0,
      saturation: 1.0,
      brightness: 1.0,
      kelvin: 5000
    },
    duration: 3000
  });
}).then(() => {
  console.log('Done!');
}).catch((error) => {
  console.error(error);
});
}

// Routing 

app.get('/', function(req, res){
	res.redirect('/home');
})

// App get '/' renders homepage request
app.get('/home', function(req, res){
	res.render('index');
	//lightitupbitches();
	//speak();
});

app.get('/home/lighton', function(req, res) {
	res.redirect('/home');
	lighton();
})

app.get('/home/lightoff', function(req, res) {
	res.redirect('/home');
	lightoff();
})

app.get('/home/lightdown', function(req, res) {
	res.redirect('/home');
	lightdown(); 
})

app.get('/home/whitelight', function(req, res) {
	res.redirect('/home');
	whitelight();
})

app.listen(3000, function() {
	console.log('The server has started on port 3000');
});