#!/bin/sh

front=false
back=false
dockercomp=false

while (( "$#" )); do
    case "$1" in
    --rebuild-front)
        front=true
        shift
    ;;
    --rebuild-back)
        back=true
        shift
    ;;
    --use-docker-compose)
        dockercomp=true
        shift
    ;;
    *)
        echo "Invalid option: $1" >&2
        exit 1
    ;;
    esac
done

if $front; then
    echo "Forcing the removal of the container and image with tag front..."
    echo "Removing the container..."
    docker rmi -f front
    echo "Rebuilding the image without cache..."
    docker build --no-cache --build-arg ENVIROMENT=docker -t front ../front-end
fi

if $back; then
    echo "Forcing the removal of the container and image with tag back..."
    echo "Removing the container..."
    docker rmi -f back
    echo "Rebuilding the image without cache..."
    docker build --no-cache -t back ../backend
fi

if $dockercomp; then
    echo "Running docker-compose down..."
    docker-compose --file docker-compose-e2e.yml down
    echo "Running docker-compose up..."
    docker-compose --file docker-compose-e2e.yml up
else
    echo "Running docker run..."
    docker run -d -p 8081:9428 back
    echo "Waiting for the back-end to start..."
    while ! curl -s http://localhost:8081 > /dev/null; do
        echo -n '.'
        sleep 1
    done
    docker run -d -p 8080:80 front
    echo "Waiting for the front-end to start..."
    while ! curl -s http://localhost:8080 > /dev/null; do
        echo -n '.'
        sleep 1
    done
    echo "Front-end and back-end are up and running! Ready for E2E testing!"
    docker run e2e

    echo 
fi



