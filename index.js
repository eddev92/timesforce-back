const express = require('express')
const app = express()
const mysql = require('mysql2');
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'llancaharo1',
  database: 'fulltimeforce'
});

// creacion tabla usuarios
// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
});
// `CREATE TABLE IF NOT EXISTS users(name VARCHAR2(50), lastname VARCHAR2(50), email VARCHAR2(50), usergroup VARCHAR2(50), lastvisit VARCHAR2(50), registered VARCHAR2(50))`

  let createTodos = `create table if not exists allUsers(
                          id int,
                          enabled int,
                          activated int,
                          name varchar(50),
                          lastname varchar(50),
                          email varchar(50),
                          usergroup varchar(50),
                          lastvisit varchar(50),
                          registered varchar(50)
                      )`;
 
  connection.query(createTodos, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

app.post('/user', (req, res) => {
  // let bodyRequest = req.body;
  let bodyRequest = {
    id: 1,
    enabled: 0,
    activated: 1,
    name: "varchar(50)",
    lastname: "varchar(50)",
    email:" varchar(50)",
    usergroup:" varchar(50)",
    lastvisit:" varchar(50)",
    registered:" varchar(50)"
  }
    if (!bodyRequest) {
      return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    connection.query("INSERT INTO allUsers SET ? ", { id: bodyRequest.id, enabled: bodyRequest.enabled, activated: bodyRequest.activated, name: bodyRequest.name, lastname: bodyRequest.lastname,
    email:bodyRequest.email, usergroup: bodyRequest.usergroup, lastvisit: bodyRequest.lastvisit, registered:bodyRequest.registered }, function (error, results, fields) {
    if (error) throw error;
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
      });
  });
  

app.listen(8080, () => {
  console.log("conecting successfully!!")
})