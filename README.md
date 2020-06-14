# Installation for BioPrime frontend

## Recommended specifications

- OS: Ubuntu 20.4 LTS
- RAM: 4Gb
- CPU: 4 cores
- Storage: 100Gb

## Installation

Make sure you have the latest version of Docker and Docker Compose installed.

Then create a `docker-compose.yml` file and copy the below configuration. Change the username, password and optionally ports. 
Do not change the name of the services.

```yaml
version: '3'
services:
  frontend:
    image: "bioprime/frontend:latest"
    ports:
      - "80:80"
  backend:
    image: "bioprime/backend:latest"
    environment:
      - DB_USER=postgres
      - DB_PW=postgres
      - JDBC_URL=jdbc:postgresql://db/bioprime
    ports:
      - "8080:8080"
  db:
    image: postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=bioprime
    ports:
      - "5433:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

To check if backend is running go to http://localhost:8081/healthcheck
To check if frontend is running go to http://localhost:80/

## DEV Installation

```$xslt
npm install
npm start
```

## Build

```$xslt
npm build
```
