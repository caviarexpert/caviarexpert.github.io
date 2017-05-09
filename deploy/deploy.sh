#! /bin/bash
set -e # exit with nonzero exit code if anything fails

if [ "$TRAVIS_BRANCH" != "dev" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the dev! No deploy!"
  exit 0
fi

# clear and re-create the out directory
rm -rf out || exit 0;
mkdir out;

# go to the out directory and create a *new* Git repo
cd out
git init

# config
git config --global user.email "dev@itranga.com"
git config --global user.name "Travis CI"

git add .
rev=$(git rev-parse --short HEAD)
git commit -m "rebuild pages at ${rev}"
#git push --force --quiet "https://${GH_TOKEN}@${PUSH_GIT_REPO}" master:${PUSH_GIT_BRANCH} > /dev/null 2>&1
git push --force --quiet "https://${GH_TOKEN}@${PUSH_GIT_REPO}" master:${PUSH_GIT_BRANCH}