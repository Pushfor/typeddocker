#!/bin/sh
rm -rf ./compose/app/.build/
docker-compose down
docker-compose -f ./docker-compose.electron.yaml build --no-cache
docker-compose -f ./docker-compose.electron.yaml up 
# sudo chmod -R 777 ./compose/app/.build 
# cp ./compose/app/.build/electron/desktop.js ./compose/app/.build/public/main.js
# cp ./compose/app/src/package.json ./compose/app/.build/public
# electron ./compose/app/.build/public
