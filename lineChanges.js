// Special thanks to https://gist.github.com/eyecatchup/3fb7ef0c0cbdb72412fc for the git command here
const shell = require('shelljs')
module.exports = function ({ author, since }) {

  const linesAddedName = "Total Lines Added"
  const linesDeletedName = "Total Lines Deleted"
  
  buffer = shell.exec(`git log --author="${author}" --since="${since}" --pretty=tformat: --numstat | awk '{inserted+=$1; deleted+=$2;} END {printf "${linesAddedName}::%s\\n${linesDeletedName}::%s", inserted, deleted }'`, { silent: true }).stdout

  stats = {}
  lines = buffer.toString().split('\n')
  lines.forEach(line => {
    let [statName, result] = line.split("::")
    stats[statName] = Number(result)
  })

  // Here you can add any combination of the above two stats
  stats['Total Lines Delta'] = stats[linesAddedName] - stats[linesDeletedName]
  stats['Lines Add:Delete (1: n) Ratio'] = stats[linesDeletedName] / stats[linesAddedName]

  return stats
}