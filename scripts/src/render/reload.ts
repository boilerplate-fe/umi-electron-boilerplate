export default (api: any) => {
  api.onDevCompileDone(({ isFirstCompile }: { isFirstCompile: boolean }) => {
    if (!isFirstCompile) {
      return;
    }
    process.on('message', (message: { type: string }) => {
      if (message.type) {
        if (message.type === 'hmr') {
          setTimeout(() => {
            const server = api.getServer();
            server.sockWrite({ sockets: server.sockets, type: 'ok', data: { reload: 'true' } });
          }, 1000);
        }
      }
    });
  });
};
