const { spawn } = require('node:child_process');
const path = require('node:path');
const appDir = path.resolve(__dirname, '..');
const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

async function startApi(folder, port) {
  const url = `http://127.0.0.1:${port}/`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
    if (response.ok) return console.log(`${folder} already running on ${port}`);
  } catch {}
  const child = spawn(process.execPath, ['index.js'], {
    cwd: path.resolve(appDir, '..', folder), stdio: 'inherit', windowsHide: true,
  });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  for (let attempt = 0; attempt < 30; attempt++) {
    if (child.exitCode !== null) throw new Error(`${folder} failed to start`);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`${folder} did not become ready on port ${port}`);
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
(async () => {
  const args = process.argv.slice(2);
  const fashionOnly = args.includes('--fashion-only');
  const angularArgs = args.filter(arg => arg !== '--fashion-only');
  if (!fashionOnly) await startApi('my-server', 3000);
  await startApi('my-server-mongodb', 4000);

  const hasPort = angularArgs.some(arg => arg === '--port' || arg.startsWith('--port='));
  const angular = spawn(process.execPath, [
    path.join(appDir, 'node_modules/@angular/cli/bin/ng.js'),
    'serve', '--host', 'localhost', ...(hasPort ? [] : ['--port', '4200']), ...angularArgs,
  ], { cwd: appDir, stdio: 'inherit', windowsHide: true });
  children.push(angular);
  angular.on('error', error => { console.error(error.message); stop(1); });
  angular.on('exit', code => stop(code || 0));
})().catch(error => { console.error(error.message); stop(1); });



