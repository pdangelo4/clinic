var sio = require('socket.io');
var io = null;
const connectedUsers = {};

exports.io = function() {
    return io;
};

exports.initialize = function(server) {
    io = sio(server);

    io.on('connection', function(socket) {
        console.log({
            socket
        });
    });

    return io;
};
