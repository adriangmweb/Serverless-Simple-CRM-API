#!/bin/bash

cp ./package* ./layers/api/nodejs/
npm install --prefix ./layers/api/nodejs/ --production
rm ./layers/api/nodejs/package*
find ./layers/api/nodejs/node_modules/ -type d -name "aws-sdk" -exec rm -rf {} +