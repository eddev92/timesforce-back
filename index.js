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

  let createTodos = `create table if not exists allNewsUsersTimesForce(
                          id int,
                          enabled int,
                          activated int,
                          name varchar(50),
                          username varchar(50),
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
    name: "name(50)",
    username: "username(50)",
    email:" email(50)",
    usergroup:" usergroup(50)",
    lastvisit:" lastvisit(50)",
    registered:" registered(50)"
  }
    if (!bodyRequest) {
      return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    connection.query("INSERT INTO allNewsUsersTimesForce SET ? ", { id: bodyRequest.id, enabled: bodyRequest.enabled, activated: bodyRequest.activated, name: bodyRequest.name,
    email:bodyRequest.email, username:bodyRequest.username, usergroup: bodyRequest.usergroup, lastvisit: bodyRequest.lastvisit, registered:bodyRequest.registered }, function (error, results, fields) {
    if (error) throw error;
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
      });
  });
  

app.listen(8080, () => {
  console.log("conecting successfully!!")
})