const net = require('net');
const server = net.createServer(action);
server.listen(8383);

function action(socket) {};

server.on('connection', (socket) => {
    socket.emit('test', 'weee')
    server.add = (data) => {
        try {
            socket.write(data);
            socket.pipe(socket);
        } catch (e) {}
    };
    server.add(JSON.stringify({ bla: 1, blabla: 2 }))
})

module.exports = server;