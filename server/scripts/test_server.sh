#!/usr/bin/env bash

docker-compose -f docker-compose.yml -f docker-compose.test.yml run api
