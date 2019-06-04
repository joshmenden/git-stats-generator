# git-stats-generator

A simple command line driven script to generate a few basic git stats for your repo.

Running this script will generate for you:

* Total PRs Merged
* Total PR Approvals
* Total Commits
* Total Lines Added
* Total Lines Deleted
* Total Lines Delta
* Lines Added/Deleted Ratio



## How to Use


### Install Dependencies

`npm install`


### Supported Command Line Flags

`--path` : The absolute path of the repo for which you want to see the stats

`--author` : The the email of the author. This can also be a regex.

`--since` : The beginning date for which the stats will be generated. This should be in this format: "04 June 2019"

`--author-email` : (OPTIONAL) If you use a regex for the `--author` flag, or if the email that the author uses to approve PRS is different from their git email, include it in this flag. Otherwise it will use the `--author`.


### Example usage

`node index.js --path "/my/path/to/repo" --author=".*smith.*" --since="01 January 2015" --author-email="jane.smith@gmail.com"`



## Why These Stats Are a Terrible Representation of Value

These numbers are fun, but let's look at how they really aren't that great at determining developer productivity...

### Total PRs Merged

This one is not without its merits. On the one hand, it shows how frequently the developer is going through the process of creating a pull request and requesting comments, rather than just shipping to master. One thing to consider, however, is that this stat really depends on the workflow of the developer. For example, if they do one large PR where another developer would do 3 smaller ones, that would affect this stat.

### Total PR Approvals

This is one stat that is actually quite valuable. It shows how many times the developer took the time to review and approve another developer's PR. Of course this is all relative -- some developers probably have more opportunities to review PRs in the first place.

### Total Commits

_cringe_ Yes, this one is particularly troublesome. As mentioned earlier, it really shows more about the developer's work flow than their actual productivity. Not to mention, with git squash, a developer could have tens or hundreds of actual commits hiding behind a single commit. So really don't put too much weight into this one.

### Total Lines Stats

These stats are calculated by looking at each file's add / removal count _per commit_. This is easy to game. For example, let's say I write a completely new file that has 2 empty lines between every line of code, totaling 300 lines. I commit this file. I have now added 300 lines of code. But then, if in a following commit, I simply remove the unecessary blank lines, I have deleted 200 lines of code.

My delta is still only 100 lines of additional code -- the same as it would be if I had done them both in one single commit -- but my add:delete ratio is now off. Having this in two commits gives me an add : delete ratio of (1: 0.666), whereas if I had put them in a single commit, by add : delete ratio would be (1: 0).

In this sense, having a good add : delete ratio could almost be seen as an indicator of developers who take two commits to do something that would take a more senior developer only one.
