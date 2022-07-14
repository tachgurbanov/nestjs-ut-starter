#### not tested yet

## Start database

edit ``resources/docker-compose.yml`` you should create 3 database for prod, test, dev

if your prod database name is ``nestjs`` edit docker-compose.yml like this;
```
- POSTGRES_MULTIPLE_DATABASES=nestjs,nestjstest,nestjsdev
```
then run commands
```bash
$ cd resources
$ docker compose up 
```

## Generate public and private keys

run command
```bash
$ yarn generatekeys
```

## Start server

edit .env file then run command
```bash
$ yarn start:dev
```