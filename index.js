const shell = require('shelljs')
const prsMerged = require('./prsMerged.js')
const totalCommits = require('./totalCommits.js')
const prApprovals = require('./prApprovals.js')
const lineChanges = require('./lineChanges.js')

if (!process.argv.includes('--path') || !process.argv.includes('--author') || !process.argv.includes('--since')) {
  console.log('Missing one of the following required arguments: --path, --author, --since')
  return
}

// This is an optional argument. It should be the email
// of the developer that matches the email address with
// which they approve pull requests
let authorEmailIndex = undefined
if (process.argv.includes('--author-email')) {
  authorEmailIndex = process.argv.indexOf('--author-email') + 1
}

let pathIndex = process.argv.indexOf('--path') + 1
let authorIndex = process.argv.indexOf('--author') + 1
let sinceIndex = process.argv.indexOf('--since') + 1
const path = process.argv[pathIndex]
const author = process.argv[authorIndex]
const since = process.argv[sinceIndex]
let authorEmail = undefined
if (authorEmailIndex) {
  authorEmail = process.argv[authorEmailIndex]
}

shell.cd(path)
shell.exec('git checkout master', { silent: true })

function GitStat (statName, result) {
  this.statName = statName
  this.result = result
}

prs = new GitStat("Total PRs Merged", prsMerged({ since: since, author: author }))
approvals = new GitStat("Total PR Approvals", prApprovals({ since: since, authorEmail: authorEmail ? authorEmail : author }))
commits = new GitStat("Total Commits", totalCommits({ author: author, since: since}))

let lineStatObject = lineChanges({ author: author, since: since })
let lineStats = []

Object.keys(lineStatObject).forEach(key => {
  lineStats.push(new GitStat(key, lineStatObject[key]))
})

console.table([prs, approvals, commits, ...lineStats])