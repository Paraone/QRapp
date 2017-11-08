const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mkdir = require('mkdirp');
const port = process.env.PORT || 3030;

// Set up the express app
const app = express();

// set up multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const {username} = req.body;
    const {originalname} = file;
    let path = `./files/${username}`;

    mkdir(path, (err)=>{
      if(err) console.log('mkdir err:', err);
      else cb(null, path);
    });
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({storage});

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
  return res.json({message: 'Connected'});
});

// upload
app.post('/upload', upload.single('uploadFile'), (req, res)=>{
  if(!req.file) return res.json({err: 'No file uploaded'});
  const {user_id, username} = req.body;
  const {originalname} = req.file;
  db.any('INSERT INTO files (id, user_id, address) VALUES (DEFAULT, $1, $2)', [user_id, `./files/${username}/${originalname}`]).catch((err) =>{
    if(err) return res.json({err: 'Could not store reference to file in db'});
  }).then((data)=>{
    console.log('data', data);
    return res.json({message: 'image uploaded and stored'});
  })
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
      return res.json(err);
    }).then((user)=>{
      console.log(user);
      const {id, email, username} = user;
      jwt.sign({id, username, email}, 'secret', {expiresIn: (30)}, (err, token)=>{
        if(err) console.log('err', err);
        return res.json({token, id, username, email});
      });
    });
  });
});

app.post('/login', (req, res)=>{
  const {username: usernm, password} = req.body;

  db.any('SELECT * FROM users WHERE username=$1 OR email=$1', [usernm]).catch((err)=>{
    if(err) {
      console.log('err', err);
      return res.json({err, message: 'Username or password is incorrect.'});
    }
  }).then((user)=>{
    console.log('user', user);
    if(!user[0]) return res.json({err: 'Username or password is incorrect!'});
    const {id, username, email, password_digest} = user[0];
    bcrypt.compare(password, password_digest, (err, cmp)=>{
      if(cmp){
        jwt.sign({id, username, email}, 'secret', {expiresIn: (30)}, (err, token)=>{
          if(err) console.log('err', err);
          return res.json({token, id, username, email});
        });
      }else{
        return res.json({err: err || 'Username or password is incorrect!'});
      }
    })
  });
});

app.post('/validate', (req, res)=>{
  const {token} = req.body;
  jwt.verify(token, 'secret', (err, decoded)=>{
    if(err) return res.json({err});
    else if(decoded)return res.json({decoded});
  });
});

app.post('/logout', (req, res)=>{
  const {id} = req.body;
  return res.json({id});
});

// get all users
app.post('/users', (req, res)=>{

});

// get single user
app.post('/users/:id', (req, res)=>{

});

// update user
app.put('/users/:id', (req, res)=>{

});

// delete users
app.delete('/users/:id', (req, res)=>{

});
