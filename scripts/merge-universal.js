const path = require('path');
const { makeUniversalApp } = require('@electron/universal');

exports.default = async function mergeUniversal(context) {
  if (process.platform !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const outDir = context.appOutDir;
  const path = require('path');
const { makeUniversalApp } = require('@electron/universal');

exports.default = async function mergeUniversal(context) {
  if (process.platform !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  const x64AppPath = path.resolve(__dirname, `../dist/mac-x64/${appName}.app`);
  const arm64AppPath = path.resolve(__dirname, `../dist/mac-arm64/${appName}.app`);
  const outAppPath = path.resolve(__dirname, `../dist/mac-universal/${appName}.app`);

  console.log(`\n🛠  Merging ${x64AppPath} + ${arm64AppPath} into ${outAppPath}`);

  await makeUniversalApp({
    x64AppPath,
    arm64AppPath,
    outAppPath,
    force: true,
    mergeASARs: true,
    singleArchFiles: [
      '**/node_modules/@serialport/bindings-cpp/bin/darwin-x64-*/**',
      '**/node_modules/ffi-napi/bin/darwin-x64-*/**',
      '**/node_modules/ref-napi/bin/darwin-x64-*/**',
      '**/node_modules/node-pty/bin/darwin-x64-*/**'
    ]
  });

  console.log('✅ Universal binary created at:', outAppPath);
};


  console.log(`\n🛠  Merging ${outDir} + ${arm64AppPath} into ${universalPath}`);

  await makeUniversalApp({
    x64AppPath: outDir,
    arm64AppPath,
    outAppPath: universalPath,
    force: true,
    mergeASARs: true,
    singleArchFiles: [
      '**/node_modules/@serialport/bindings-cpp/bin/darwin-x64-*/**',
      '**/node_modules/ffi-napi/bin/darwin-x64-*/**',
      '**/node_modules/ref-napi/bin/darwin-x64-*/**',
      '**/node_modules/node-pty/bin/darwin-x64-*/**'
    ]
  });

  console.log('✅ Universal binary created at:', universalPath);
};
