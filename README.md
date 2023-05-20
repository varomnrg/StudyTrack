# StudyTrack

This API is a tool to help students organize their studies. It is a REST API built with Node.js, Hapi.js, and PostgreSQL. It uses JWT for authentication and authorization. It is a work in progress and is not yet ready for production. This APi is used for college project.

## Documentation

[Documentation](https://varomnrg.xyz/studytrack/documentation)

## Features

-   Profile
-   Notes
-   Agenda
-   Tasks
-   Authentications

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

General

`HOST`

`PORT`

Postgres Database

`PGUSER`

`PGPASSWORD`

`PGDATABASE`

`PGHOST`

`PGPORT`

JWT Config

`ACCESS_TOKEN_KEY`

`ACCESS_TOKEN_AGE`

`REFRESH_TOKEN_KEY`

## Installation

Install with npm

```bash
  npm install
```

Then put this in the package.json script

```json
{
    "start-prod": "node ./src/index.js",
    "start-dev": "nodemon ./src/index.js",
    "migrate": "node-pg-migrate",
    "test": "npx jest"
}
```

## Deployment

Development

```bash
  npm run start-dev
```

Production

```bash
  npm run start-prod
```

## Authors

-   [@varomnrg](https://www.github.com/varomnrg)
