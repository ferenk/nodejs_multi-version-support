#!/bin/bash
set -e

rm -rf client_versions
mkdir -p client_versions

# Version 0.1
git --work-tree=client_versions checkout v0.1 -- client
# npm install
# npm run build
mv client_versions/client client_versions/v0.1

# Version 0.2
git --work-tree=client_versions checkout v0.2 -- client
mv client_versions/client client_versions/v0.2


