// Import express

let express = require('express');
// Import Body parser
//let bodyParser = require('body-parser');
// Import Mongoose
const Product = require('./models/productModel');
let mongoose = require('mongoose');
const socket = require('socket.io');
// Initialise the app
let app = express();
require('dotenv/config');
// Import routes
let apiRoutes = require("./api-routes");
app.use(express.json());
// Configure bodyparser to handle post requests
app.use(express.urlencoded({
    extended: true
}));

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
const server = app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
const io = socket(server, 
    {
      path: '/socket', transports: ['websocket', 'polling'], credentials: true , allowEIO3: true }
);

io.on("connection", (socket)=>{
    console.log('user connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    io.emit('changes', 'attack');
});

Product.watch().on('change', (change) => {

    console.log(change.fullDocument);
    io.emit('changes', change.fullDocument);
});