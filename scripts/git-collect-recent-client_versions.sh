#!/bin/bash
set -e

export TAGS_COUNT=5
export OUTPUT_FILE=client_versions.tar.bz2

#get the list of the recent tags
export recent_tags=`git for-each-ref --sort=-creatordate --format '%(refname:short)' refs/tags | head -n $TAGS_COUNT`
echo Recent tags: $recent_tags

# clean the results of the previos execution
rm -rf client_versions
mkdir client_versions

for tag in $recent_tags; do \
  echo Getting tag $tag...; \
  git --work-tree=client_versions checkout $tag -- client;
  mv client_versions/client client_versions/$tag;
done

echo; echo -n "Creating tar.bz2 archive..."
tar -cjf $OUTPUT_FILE client_versions
echo " done (verified: `ls $OUTPUT_FILE 2>&1`)"

