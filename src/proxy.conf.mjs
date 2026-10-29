// Angular loads this module for every ng serve, including IDE Run commands.
// Ensure Fashion API is available even when npm start is bypassed.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
try {
  const response = await fetch('http://127.0.0.1:4000/', { signal: AbortSignal.timeout(1500) });
  const info = await response.json();
  if (!response.ok || info.name !== 'server-fashion') throw new Error('PORT_CONFLICT');
} catch (error) {
  if (error.message === 'PORT_CONFLICT') {
    throw new Error('Cổng 4000 đang được ứng dụng khác sử dụng. Hãy dừng ứng dụng đó rồi chạy lại.');
  }
  const { app } = require('../../my-server-mongodb/index.js');
  await new Promise((resolve, reject) => {
    const server = app.listen(4000, () => {
      console.log('Fashion API tự khởi động: http://localhost:4000');
      resolve();
    });
    server.on('error', error => error.code === 'EADDRINUSE' ? resolve() : reject(error));
  });
}
export default require('./proxy.conf.json');
