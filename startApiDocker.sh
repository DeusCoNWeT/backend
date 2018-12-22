#!/bin/bash

#BUILD IMAGE
echo "---------------------SETUP DOCKER---------------------"
sudo docker-compose build

#RUN DOCKER
sudo docker-compose up