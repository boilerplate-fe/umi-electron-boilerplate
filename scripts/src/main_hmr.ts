import { connect } from 'net';

if (process.env.SOCKET_PORT) {
  const socket = connect({
    port: parseInt(process.env.SOCKET_PORT, 10),
  });
  socket.on('connect', () => {
    socket.setEncoding('utf-8');
  });

  socket.on('data', (message: string) => {
    if (message === 'exit') {
      process.exit(100);
    }
  });
}
