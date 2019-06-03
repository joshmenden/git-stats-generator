const shell = require('shelljs')
module.exports = function ({ since, authorEmail }) {
  buffer = shell.exec(`git log --since="${since}"`, { silent: true }).stdout
  
  let lines = buffer.toString().split('\n')
  let approvalsPerPerson = {}
  
  lines.forEach(line => {
    let trimmedLine = line.trim()
    if (trimmedLine.split(' ')[0] === 'Approved-by:') {
      let email = trimmedLine.split(' ').pop()
      if (approvalsPerPerson.hasOwnProperty(email)) {
        approvalsPerPerson[email] += 1
      } else {
        approvalsPerPerson[email] = 1
      }
    }
  })

  return approvalsPerPerson[`<${authorEmail}>`]
  
  // Uncomment the following lines to see an ordered total of all approvals

  // arrayOfApprovals = Object.keys(approvalsPerPerson).map((k) => { return {email: k, merges: approvalsPerPerson[k]}})
  // sortedArray = arrayOfApprovals.sort((a, b) => {
  //   if (a.merges < b.merges) return -1
  //   if (a.merges > b.merges) return 1
  //   if (a.merges == b.merges) return 0
  // }).reverse()
  
  // console.log(sortedArray)
}