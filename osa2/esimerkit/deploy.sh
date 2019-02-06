#!/bin/sh
npm run build
rm -rf ../../osa3/esimerkit/build
cp -r build ../../osa3/esimerkit/