const fs = require('fs');
const tsc = require('typescript');

/**
 * @param {String} src
 * @param {String} path
 * @return {String}
 */

const options = tsc.parseConfigFileTextToJson('./tsconfig.json', fs.readFileSync('./tsconfig.json'), true).config;

module.exports.process = function (src, path) {
  if (path.endsWith('ts')) {
    return tsc.transpile(src, options || {}, path, []);
  }
  return src;
}