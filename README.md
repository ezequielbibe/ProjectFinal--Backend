# Welcome to my final project

### How to copy this project

1. clone this repository

    `$ git clone https://github.com/ezequielbibe/ProjectFinal--Backend.git`
2. install all packages

    `$ npm i`
3. configure .env with env.template

    * PORT = Number of port, example: 8080
    * PERSISTENCE = MONGO or MEMORY
    * NODE_ENV = DEV or PROD
    * SESSION_TIME = number on milliseconds, example: 6000
    * MONGO_ATLAS = url mongo atlas for node_env prod
    * MONGO_LOCAL = url mongo local for node_env dev
    * PRIVATE_KEY = write what you want, but type to string
    * HOST_EMAIL = host email (nodemailer host)
    * ADMIN_EMAIL = admin email
    * EMAIL = email of page
    * PASS = password email auth
4. run project with nodemon

    `$ nodemon index.js`