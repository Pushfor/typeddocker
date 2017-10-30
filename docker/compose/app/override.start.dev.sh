#!/bin/sh
export DEBUG=express,typeddocker*
gulp watch &
node /build/express/index.js
