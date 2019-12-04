#!/bin/bash

#BUILD IMAGE
echo "---------------------SETUP DOCKER---------------------"
docker-compose build

#RUN DOCKER
docker-compose up
