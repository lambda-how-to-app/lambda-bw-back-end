# back-end

lambda build week backend repo

# HOW-TO

**How-To-App** is a fullstack javascript application that enables users share and guide people on life hack ideas and skills.

# Table Of Content

1. [Getting Started](#getting-started 'Getting Started')
   .._[prerequisites](#prerequisites 'Prerequisites')
   .._[Installation](#installation 'Installation')
2. [Technology Stack](#technology-stack)
   ..\* [Dependencies](#dependencies)
3. [Features](#features 'Features')
4. [API-DOCUMENTATION](#api-documentation 'API-DOCUMENTATION')
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

1. The users can signup as creators or user.
2. Users can create an account and log in.
3. The users should be able to view life hacks
4. The creator can create, read, update and delete life hacks created by them.
5. The user can share and save life hacks.

## API-DOCUMENTATION

ONLINE [API-DOCUMENTATION](https://documenter.getpostman.com/view/7166450/SVYnSM8z)

### Endpoints

| Method  | Endpoint               | Description                                                                                                                                                      |
| ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST    | /api/v1/signup         | Creates a new user using the information {`fullname,username, email, password (and guide which false by default), profileimage`} sent inside the `request body`. |
| POST    | /api/v1/login          | logs in a signed user using information {`username or email and password`} sent inside of the `request body`.                                                    |
| GET     | /api/v1/users          | Get all registered users.                                                                                                                                        |
| GET/:id | /api/v1/users/:id      | Get a registered users.                                                                                                                                          |
| GET     | /api/v1/profile/guides | Get all registered guides.                                                                                                                                       |
| GET     | /api/v1/profile/users  | Get all registered regular users.                                                                                                                                |
| POST    | /api/v1/lifehack       | create a lifehack.                                                                                                                                               |

### Fields

| Field    | Data Type | Metadata                                                                                      |
| -------- | --------- | --------------------------------------------------------------------------------------------- |
| username | string    | Alphanumeric value `required`                                                                 |
| email    | string    | Must be a valid email `required`                                                              |
| password |           | Not less than 8 characters`required`.                                                         |
| guide    | boolean   | `defaults to [false]` used to indicate if a user wants to signup as a guide or not `required` |

### Response

#### Signup

```
{
    "success": true,
    "statusCode": 201,
    "message": "Signup succesful",
    "body": {
        "userId": 1,
        "userName": "clark",
        "email": "clark@gmail.com",
        "guide": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiY2xhcmsiLCJlbWFpbCI6ImNsYXJrQGdtYWlsLmNvbSIsImd1aWRlIjp0cnVlLCJpYXQiOjE1NjQ0MzAwNzMsImV4cCI6MTU2OTYxNDA3M30.YmqIP5t84pIUrLQDGtK_UPNVLgyLh6iv6ExDBlRDsVw"
    }
}
```

```
{
    "success": false,
    "statusCode": 409,
    "message": "User with email or username already exist"
}
```

### Login

```
{
    "success": true,
    "statusCode": 200,
    "message": "Login succesful",
    "body": {
        "userId": 1,
        "userName": "clark",
        "email": "clark@gmail.com",
        "guide": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiY2xhcmsiLCJlbWFpbCI6ImNsYXJrQGdtYWlsLmNvbSIsImd1aWRlIjp0cnVlLCJpYXQiOjE1NjQ0Mzg5NzksImV4cCI6MTU2OTYyMjk3OX0.vpGFTGrHzwezDLbwQLCMjPQvEKUw6_p_0MnnWmBk_q4"
    }
}
```

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.

## Deployment

This Application will be deployed on [Heroku Deploy](https://lambda-howto-app.herokuapp.com)

## Useful Links

1. Project Management road map [Trello Board](https://trello.com/b/peDNBtDc/how-to-app)
2. [Github Repo](https://github.com/lambda-how-to-app/lambda-bw-back-end)

## Acknowledgment

- Lambda
- Andela
