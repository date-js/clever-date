#!/bin/bash

DIRECTORY=$(dirname $(realpath $0 ))

docker run -it --rm --name clever-date -v "$DIRECTORY/..":/home/node/app -w /home/node/app -p 8092:8080 node:13 bash
