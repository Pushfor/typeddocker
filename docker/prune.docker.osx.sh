#!/bin/sh   
docker container prune   # Remove all stopped containers
docker volume prune      # Remove all unused volumes
docker image prune       # Remove unused images
docker system prune   
