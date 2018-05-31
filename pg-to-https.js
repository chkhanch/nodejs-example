const net = require('net');

const client = net.createConnection({ port: 8383 }, action);
const EventEmitter = require('events');
const evt = new EventEmitter();
evt.setMaxListeners(10)

function action(err) { if (err) console.log(err); }
evt.on('want_Masha', (data, fn) => {
    let yeap = false;
    //setImmediate(() => { if (yeap) fn('ahhaha') })
    if (data.bla == 1) {
        fn(null, true);
        yeap = true;
        return;
    }
    fn(new Error('Not valide'));
});

client.on('data', (params) => {
    const data = JSON.parse(params);
    evt.emit('want_Masha', data, (err, result) => {
        if (!err) {
            process.send(result)
            console.log(result, process.pid)
            client.end();
            return;
        }
        console.log(err);
    });
});
client.on('test', data => console.log(data))