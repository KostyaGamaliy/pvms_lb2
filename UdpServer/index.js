const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const backendNumber = 100;

server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const clientNumber = parseInt(msg.toString());
    if (!isNaN(clientNumber)) {
        console.log(`Received number from client: ${clientNumber}`);

        const smallestNumber = Math.min(clientNumber, backendNumber);
        server.send(smallestNumber.toString(), rinfo.port, rinfo.address, (err) => {
            if (err) {
                console.error('Error sending response to client:', err);
            } else {
                console.log(`Sent smallest number to client: ${smallestNumber}`);
            }
        });
    } else {
        console.log('Received data from client is not a number');
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server is listening on ${address.address}:${address.port}`);
});

server.bind(8080);
