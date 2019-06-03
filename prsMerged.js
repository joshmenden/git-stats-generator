const shell = require('shelljs')
module.exports = function ({ since, author }) {
  buffer = shell.exec(`git log --since="${since}" --author="${author}"`, { silent: true }).stdout
  
  let lines = buffer.toString().split('\n')
  let prNumbers = []
  
  lines.forEach(line => {
    let trimmedLine = line.trim()
    let arrayOfWords = trimmedLine.split(' ')
    if (arrayOfWords[0] === 'Merged' && trimmedLine.includes('(pull request #')) {
      prNumber = arrayOfWords.pop()
      prNumbers.push(prNumber.slice(1, prNumber.length - 1))
    }
  })
  
  return prNumbers.length
}