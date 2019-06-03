const shell = require('shelljs')
module.exports = function ({ author, since }) {
  
  // Ideally we'd use 'git shortlog', but for some reason shelljs doesn't like that
  buffer = shell.exec(`git log --since="${since}" --pretty=oneline --author="${author}"`, { silent: true }).stdout
  let lines = buffer.toString().split('\n')
  return lines.length
}