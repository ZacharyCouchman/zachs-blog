#!/bin/bash

## This script is used when deploying to GitHub pages
## GitHub pages deploys the files in the /repo-name directory and so all paths to images in the public folder
## need to be replaced with that prefix. 
## OS type check changes the command whether running on Mac or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
  LC_ALL=C find out -type f -exec sed -i '' 's|/img/|/zachs-blog/img/|g' {} \;
else
  LC_ALL=C find out -type f -exec sed -i 's|/img/|/zachs-blog/img/|g' {} \;
fi