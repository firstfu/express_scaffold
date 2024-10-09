#!/bin/zsh

## Git同步script

git fetch --all
# origin/main 是你需要同步的分支，這裡是同步遠端分支main
git reset --hard origin/main
git pull
