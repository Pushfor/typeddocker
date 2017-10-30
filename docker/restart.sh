#!/bin/bash
docker-compose down
docker-compose -f ./docker-compose.dev.yaml build --no-cache
docker-compose -f ./docker-compose.dev.yaml up 
./cli.sh
