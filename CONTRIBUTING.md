# Contributing

We have a [Code of Conduct](https://openactive.io/public-openactive-w3c/code-of-conduct/); please follow it in all your interactions with the project.

## Reporting Issues & Requesting Features

If you notice something wrong with this code, or think there's something that it should do, please open a GitHub Issue. Before creating a new issue check to see if the issue already exists. If not, then please do report it. 

## Code Quality

Spontaneous bug fixes and incremental feature PRs are welcome! However, before making substantial changes to this repository, we encourage you to first discuss the change you wish to make via an [issue](https://github.com/openactive/conformance-services/issues), [Slack](https://slack.openactive.io/), or any other method with the [owners of this repository](https://www.openactive.io/about/).

The general rule is: "Leave it at least as good as you found it. Preferably, a little better ☺️".

New code should, as much as possible, lead to increased coverage of:

* Mocha tests

-: so that the codebase becomes more reliable over time.

## Commits

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. This makes our commit history easy to understand by humans and by automated tools.

## Code Style

Although no named code style has been applied, please try to keep contributions looking and feeling similar to existing code. 

## Pull Request Process

If you have write access to the repo:

Changes should be made by starting a new branch (from `master`), writing the changes in that branch and then submitting a Pull Request to rebase that branch into `master`.

If you don't have write access to the repo:

Changes should be made by forking this repo, and making changes on a branch in your fork. When you're ready to submit your changes for review, open a Pull Request. 

## Developer Certificate of Origin (DCO) 

We use DCOs to ensure that we're able to use contributions. See the [GitHub documentation on DCOs](https://github.com/apps/dco) for more information. 


### Branch naming

Whether on this repo or a fork, please use a branch that's named for the change that it's introducing, plus the issue number (e.g. `42-add-new-widget`) 


### Guidance for PRs

* Every Pull Request should solve or partially solve an existing GitHub issue. It's ok if this is an issue that you open specifically to close with a PR.
* Ensure that documentation reflects the new changes.
* Check that CI tests pass before merging a Pull Request.
* Ensure that your Pull Request has at least one approval before merging.

