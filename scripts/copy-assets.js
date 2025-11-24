const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '..', 'Assets');
const dest = path.resolve(__dirname, '..', 'public', 'Assets');

function copyRecursiveSync (src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  if (!fs.existsSync(source)) {
    console.log('No Assets folder found at', source);
    process.exit(0);
  }
  copyRecursiveSync(source, dest);
  console.log('Assets copied to', dest);
} catch (err) {
  console.error('Failed to copy assets', err);
  process.exit(1);
}
