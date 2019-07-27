# back-end

lambda build week backend repo

# POLITICO

**How-To-App** is a fullstack javascript application that enables users share and guide people on life hack ideas and skills.

# Table Of Content

1. [Getting Started](#getting-started 'Getting Started')
   .._[prerequisites](#prerequisites 'Prerequisites')
   .._[Installation](#installation 'Installation')
2. [Technology Stack](#technology-stack)
   ..\* [Dependencies](#dependencies)
3. [Features](#features 'Features')
4. [Built With](#built-with 'Built With')
5. [Deployment](#deployment 'Deployment')
6. [Useful Links](#author 'Useful Links')
7. [Acknowledgment](#acknowledgment 'Acknowledgment')

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To get started with this project you need a basic knowledge of :

```
Javascript (ES6)
NodeJs
SQL (Postgres/SQLITE3)
Version Control (Git)
```

### Installation

The follwing instructions will install the project on your local machine

````
1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**Knex**](https://knexjs.org/) .
3. Clone the [**repository here**](https://github.com/lambda-how-to-app/lambda-bw-back-end.git)
4. [**cd**] into the root directory of the project folder ```lambda-bw-back-end```.
5. Run `npm install` on the terminal to install Dependecies and Dev-Dependecies
````

### How to run

1. open terminal and run `npm run dev`
2. open POSTMAN and type paste each of the following route:

```
To be done
```

## Technology Stack

**UI & Templates**

1. HTML & CSS
2. Javascript

**Server Side**

1. NodeJS
2. Express

**Client Side**

1. Javascript
2. HTML and CSS

### Dependencies

- Knex
- SQLITE3
- Nodejs

## Features

The user interface is built for easy navigation and use of the application. It includes the following:

1. The users can signup as creators or c.
2. Users can create an account and log in.
3. The users should be able to register as candidate.
4. The admin should be able to view all users
5. The user can view election result

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will be pre-seeded into the application with administrative priviledges

## Deployment

This Application will be deployed on [Heroku Deploy](https://the-politico.herokuapp.com/)

## Useful Links

1. Project Management road map [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2238882)
2. [Github Repo](https://github.com/PascalUlor/politico-app)
3. UI templates[GH-PAGES](https://pascalulor.github.io/politico-app/)
4. Live demo on [Heroku Deploy](https://the-politico.herokuapp.com/)

## Acknowledgment

- Lambda
- Andela
