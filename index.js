// Import express
let express = require('express');
// Import Body parser
//let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
app.use(express.json());
// Configure bodyparser to handle post requests
app.use(express.urlencoded({
    extended: true
}));

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://coderMatthews:CoderMatthews1996@cluster0.x0unn.mongodb.net/FarmersDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;
var password = 'CoderMatthews1996';
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});