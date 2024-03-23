const net = require('net');
const numberOnBackend = 100;

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const numberFromClient = parseInt(data.toString().trim());
        console.log('Received number from client:', numberFromClient);

        const smallestNumber = Math.min(numberFromClient, numberOnBackend);
        socket.write(smallestNumber.toString());
        console.log('Sent smallest number to client:', smallestNumber);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});