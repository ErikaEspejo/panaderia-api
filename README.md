# Node APIRest - Bakery Information System
![yarn](https://img.shields.io/badge/-yarn-red?style=flat)&nbsp;
![Node.js](https://img.shields.io/badge/-Node.js-brightgreen?style=flat)&nbsp;
![Express](https://img.shields.io/badge/-Express.js-2EA1FF?style=flat)&nbsp;
![Sequelize](https://img.shields.io/badge/-Sequelize.js-2F406A?style=flat)&nbsp;
![MySQL](https://img.shields.io/badge/-MySQL-FFFFFF?style=flat)&nbsp;

## Prerequisites

- [Node](https://nodejs.org/)
- NPM, built into Node.
- [Yarn](https://yarnpkg.com/getting-started/install)
- [MySql](https://dev.mysql.com/downloads/)
- [Postman](https://www.postman.com/) or any client API Rest.

## Before starting

Make sure you have yarn installed, run on console.

```sh
> yarn --version
```

If it return an error, please install [yarn](https://yarnpkg.com/getting-started/install).

```sh
> npm install -g yarn
```

## Clone the repo

```sh
> git clone https://github.com/ErikaEspejo/panaderia-api.git
```

## Enter to folder project

```sh
> cd panaderia-api
```

## Install the app

```sh
> yarn
```

## Create .env file

- Configuration Example:
  - HTTP_HOST -> IP of server, default is 127.0.0.1.
  - HTTP_PORT -> Node listening port.
  - LOG_ACCESS -> Path where the logs will be stored, don't specify the path, just the file name, default `access.log`.
  - JWTKEY -> Is used by [JWT](https://www.npmjs.com/package/jsonwebtoken) to sign the token.
  - SALT_ROUNDS -> Controls how much time is needed to calculate a single BCrypt hash, default is 10.
  - DB_USER -> User of the database you are connecting to.
  - DB_PASS -> Password of the database you are connecting to.
  - DB_SCHEMA -> Database schema to connect.
  - DB_DIALECT -> It refers to the database management system (/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */).

Rename .env.example to .env, and set parameters required, please don't include `env:`.

```yaml
env:

# This is parameters required.
HTTP_HOST=
HTTP_PORT=
LOG_ACCESS=
JWTKEY=
SALT_ROUNDS=
DB_USER=
DB_PASS=
DB_SCHEMA=
DB_DIALECT=

```

## Install nodemon as development dependency

```sh
> yarn add -D nodemon
```

## Run the app

### Without nodemon

Run project without nodemon

```sh
> yarn start
```

### With nodemon

Run project with nodemon

```sh
> yarn run dev
```