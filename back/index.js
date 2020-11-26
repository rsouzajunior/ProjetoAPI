const express = require("express");
const app = express();

const { response, request } = require('express');
const cors = require('cors');
const { v4: uuidv4, validate: isUuid } = require('uuid');

app.use(cors());
app.use(express.json());


var allowedOrigins = [
  'http://localhost:3000']
  
app.use(function (req, res, next) { 

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
 
  next();
});


app.set("port", process.env.PORT || 5000);
app.use(express.json());


//REQUISIÇÃO
app.use(require('./personalList')); 

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel)
}

app.use(logRequests);

app.listen(app.get("port"), () => {
  console.log(`Porta do Servidor:  ${app.get("port")}`);
});
