# Blog API

## Description
This project is part of the TOP curriculum, a project made to test knowledge of REST API, Prisma ORM, authentication/passport.js, node, express, SQL/postgres, server-side programming and debugging.

Link to project instructions: https://www.theodinproject.com/lessons/node-path-nodejs-blog-api

The main focus of this project is on the backend, that is an Express REST API server that handles all different requests for a blog (with all posts, comments and users stored in a postgreSQL database handled with Prisma ORM).

Two different frontends have been built that interact with this REST API, one for blog readers and one for the admins/authors. Both of these have been built in React. Pretty basic frontends since most of the focus lays on the backend.

Users (admins/blog authors) are authenticated with JWT and PassportJS and passwords are handled with bcrypt.

## Getting Started
Live build (blog readers): **https://blog-public-crl96.netlify.app/**

Live build (blog admins/authors): **https://blog-api-admin-crl96.netlify.app/**

#### Run locally

##### Backend Server Installation

1. Clone the repository

2. Navigate to the backend directory and : **cd blog-api/backend**

3. Run build command to install packages and init prisma client: **npm run init-install**

4. Setup a PostgreSQL database and add it's credentials to the .env in the next step.

5. Create a .env file in the backend directory, look at the .env.sample for clarification.

6. Run init db command to sync your postgres db with prisma schema: **npm run init-db**

7. Run the server: **npm run start**

8. **http://localhost:3000/** will return JSON with "Hello, world" and **http://localhost:3000/posts** will return all published posts in your database

##### Frontend React Installation

1. Clone the repository (if you haven't already)

2. Navigate to the frontend directory (either public or admin): **cd blog-api/frontend/blog-public** OR **cd blog-api/frontend/blog-admin**

3. Install packages and dependencies: **npm install**

4. Create a .env file in the current directory, look at the .env.sample for clarification.

5. Run React app in dev server: **npm run dev**

6. Navigate to **http://localhost:5173**

## Technologies Used
Programming Languages: Javascript, HTML/JSX, CSS, SQL

Server-side Tools: NodeJS, Express, PassportJS, Bcrypt, Prisma ORM, PostgreSQL

Frontend Tools: React, Vite, CSS, HTML/JSX