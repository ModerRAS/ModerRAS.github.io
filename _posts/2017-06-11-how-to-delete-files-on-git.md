---
layout: post
title: how to delete files on git
date: 2017-06-11 12:00:00 +08:00
---

# Writing At First
Today I will write something about git and delete files. Because I find it is a problem.
# How to delete files on the GitHub?
## Using its website
The easiest way is to delete them on the website. But it may not be a good way to delete many files.
## Using `git rm`
This way will delete on your local repository then you will `git commit`. And then you will `git push origin master`. Then it will delete on the GitHub
## Using `git remote rm`
This can only delete some files on the remote repository. But I don't know how to use.
## Using `git rm --cache `
This way is what I use. Removing files on the git local cache. It may not delete your local file because it just delete that information. Then commit and push them. Then it will be changed on the remote repository.
# Something from GitHub help
> ## Using the BFG
> The BFG Repo-Cleaner is a faster, simpler alternative to git filter-branch for removing unwanted data. For example, to remove your file with sensitive data and leave your latest commit untouched), run:
> ```
bfg --delete-files YOUR-FILE-WITH-SENSITIVE-DATA
```
> To replace all text listed in passwords.txt wherever it can be found in your repository's history, run:
> ```
bfg --replace-text passwords.txt
```
> See the [BFG Repo-Cleaner](http://rtyley.github.io/bfg-repo-cleaner/)'s documentation for full usage and download instructions.
> ## Using filter-branch
>> Warning: If you run `git filter-branch` after stashing changes, you won't be able to retrieve your changes with other stash commands. Before running `git filter-branch`, we recommend unstashing any changes you've made. To unstash the last set of changes you've stashed, run `git stash show -p | git apply -R`. For more information, see [Git Tools Stashing](https://git-scm.com/book/en/v1/Git-Tools-Stashing).

> To illustrate how git filter-branch works, we'll show you how to remove your file with sensitive data from the history of your repository and add it to .gitignore to ensure that it is not accidentally re-committed.

For more, see [this](https://help.github.com/articles/removing-sensitive-data-from-a-repository/).
