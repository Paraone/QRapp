const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3030;

// set up bcrypt
const salt = bcrypt.genSalt(10);

// Set up the express app
const app = express();

// set up multer
const upload = multer({dest: './uploads/'});

// set up pgp
const db = pgp(process.env.DATABASE || 'postgres://paraone@localhost:5432/qr');

// set up cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Origin, Content-Type, Accept'
}

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use('*', cors());

// Connection test
app.get('/', (req, res)=>{
  res.json({message: 'Connected'});
});

// basic upload
app.post('/upload', upload.single('picfile'), (req, res)=>{

  if(!req.files) return res.json({message: 'No file uploaded'});
  let uploadFile = req.files;

  fs.appendFile(`./files/${uploadFile.img.name}`, uploadFile.img.data, (err, data)=>{
    if(err) console.log(err);
    res.json({message: 'Uploaded!'})
  });
});

// create user
app.post('/users', (req, res)=>{
  console.log('req.body', req.body);
  const {password, username, email} = req.body;

  bcrypt.hash(password, 10, (err, hash)=>{
    db.one(
      'INSERT INTO users (id, username, email, password_digest) VALUES (DEFAULT, $1, $2, $3) RETURNING *',
      [username, email, hash]
    ).catch((err)=>{
      console.log(err);
      res.json(err);
    }).then((user)=>{
      console.log(user);
      //create user session here
      res.json(user);
    });
  });
});

app.get('/login', (req, res)=>{

});

app.get('/logout', (req, res)=>{

});

// get all users
app.get('/users', (req, res)=>{

});

// get single user
app.get('/users/:id', (req, res)=>{

});

// update user
app.put('/users/:id', (req, res)=>{

});

// delete users
app.delete('/users/:id', (req, res)=>{

});
