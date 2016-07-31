const socketio = require('socket.io');

module.exports = function (server) {
    const sockets = socketio(server);

    sockets.on('connection', function (socket) {
        socket.on('message', function (data) {
             sockets.emit('message', data);
        });
    });
};
