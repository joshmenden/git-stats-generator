const shell = require('shelljs')
module.exports = function ({ author, since }) {
  
  buffer = shell.exec(`git log --author="${author}" --since="${since}" --pretty=tformat: --numstat | awk '{inserted+=$1; deleted+=$2; delta+=$1-$2;} END {printf "Total Lines Added::%s\\nTotal Lines Deleted::%s\\nTotal Lines Delta::%s", inserted, deleted, delta, ratio }'`, { silent: true }).stdout

  stats = {}
  lines = buffer.toString().split('\n')
  lines.forEach(line => {
    let [statName, result] = line.split("::")
    stats[statName] = Number(result)
  })
  return stats
}