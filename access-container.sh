#!/bin/bash

while getopts c: flag
do
    case "${flag}" in
        c) container=${OPTARG};;
    esac
done

echo $container

docker exec -it ledung-oqs-$container bash