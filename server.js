const express = require("express");
var cors = require('cors')
const http = require("http");
const mongoose = require("mongoose");
const msg = require('./models/msg')
const SocketIO = require("socket.io")

const port = 8080;
const app = express();
app.use(cors())
const server = http.createServer(app);
var mongoDB = 'mongodb://localhost:27017/my_chat_app_database';
// (server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });
var allowedOrigins = "*";
const io = new SocketIO.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
io.on("connection", socket => {
    socket.on("show_message", () => {
        msg.find({}, function (err, data) {
            io.sockets.emit("get_data", data);
        });
    })
    // socket.on("show_message", () => {
    //     msg.find({}, function (err, data) {
    //         io.sockets.emit("show_message", data);
    //     });
    // })
    socket.on("add_message", message => {
        msg.create({
            msg: message,
            date: Date.now()
        })
        socket.emit("show_message")
    })
});

app.get('/', (req, res) => {
    res.send("running...")
})
server.listen(port, () => console.log(`Listening on port ${port}`));