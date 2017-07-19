# Node-API
A basic RESTful API built using NodeJS.


<b>Terminal Commands used</b>:<br>
$ npm init<br>
$ npm install restify --save<br>
$ (sudo if required )npm install -g nodemon<br>
$ npm install restify-validator --save<br>
$ npm install mongoose --save<br>


I had used mlab for database service, used MongoDB(NoSQL). To implement the same head to config/dbConnection.js and set 'mongodb:KEY' in the return statement.

Nodemon is also used, so that you dont have to restart the server everytime you make changes. 

To run the server, go to working directory in terminal and run
$ nodemon app.js

Postman has been used for testing purpose.
