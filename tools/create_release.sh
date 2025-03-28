#!/bin/bash

SEMTAG='./tools/semtag'
ACTION=${1:-patch}

git fetch origin --tags

RELEASE_VERSION="$($SEMTAG final -s $ACTION -o)"

echo "Next release version: $RELEASE_VERSION"

npm version "$RELEASE_VERSION" -no-git-tag-version
git commit -m "chore: bump version to $RELEASE_VERSION" -a
git push origin master

$SEMTAG final -s $ACTION -v "$RELEASE_VERSION"
