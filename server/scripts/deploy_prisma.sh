#!/usr/bin/env bash

docker-compose exec -e PRISMA_ENDPOINT=http://prisma:4466/api/dev api prisma deploy
docker-compose exec -e PRISMA_ENDPOINT=http://prisma:4466/api/test api prisma deploy