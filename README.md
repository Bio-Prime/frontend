# Installation for BioPrime frontend

## Recommended specifications

- OS: Ubuntu 20.4 LTS
- RAM: 4Gb
- CPU: 4 cores
- Storage: 100Gb

## Prerequisites

The frontend application needs to access a running instance of the [backend application](https://github.com/Bio-Prime/backend) to work. So first make sure that you have that set up.

## Frontend application installation

The frontend is a React single page application being served by Apache HTTP Server.
Everything is packaged into a docker image, so make sure you have docker installed.

If you are running frontend and backend on the same server we recommend installing Docker Compose and running the `docker-compose.yml` file from the BioPrime/backedn repository. Otherwise, run this command:

```$xslt
sudo docker run -d -p 80:80 bioprime/frontend:latest
```

It runs the docker container `bioprime/frontend:latest` in detached mode `-d` on port 80 `-p 80:80`.

To test that the frontend application is working correctly, go to <http://localhost/>

## DEV Installation

```$xslt
npm install
npm start
```

## Build

```$xslt
npm build
```
