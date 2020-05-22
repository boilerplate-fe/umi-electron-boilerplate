const { connect } = require('net');

console.log('use main hmr');

if (process.env.SOCKET_PORT) {
  const socket = connect({
    port: parseInt(process.env.SOCKET_PORT, 10),
  });
  socket.on('connect', () => {
    socket.setEncoding('utf-8');
  });

  socket.on('data', message => {
    if (message === 'exit') {
      app.exit(100);
    }
  });
}
