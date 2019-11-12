const { readFile, writeFile } = require('fs');
const { env } = require('process');

const { npm_package_version: version, npm_package_name: name } = env;

if (version === undefined) {
  throw '未知版本号';
}

readFile('./README.md', (err1, buf1) => {
  if (err1) {
    throw err1;
  }
  const text = buf1
    .toString()
    .replace(
      new RegExp(`${name}@\\d+\\.\\d+\\.\\d+`, 'g'),
      `${name}@${version}`,
    );

  writeFile('./README.md', text, err2 => {
    if (err2) {
      throw err2;
    }
  });
});
