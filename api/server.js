const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mkdir = require('mkdirp');
const utf7 = require('utf7');
const box = require('box-node-sdk');
const axios = require('axios');
const port = process.env.PORT || 3030;
const DEVTOKEN = 'OCsGEnO0lvNEAMkWIYSwNYjnNUprOdUT';

// Set up the express app
const app = express();

// set up box config
let configfile = fs.readFileSync('./boxconfig.json', {encoding: 'utf-8'});
configfile = JSON.parse(configfile);


// initialize Box SDK
let session = box.getPreconfiguredInstance(configfile);
let serviceAccountClient = session.getAppAuthClient('enterprise');

serviceAccountClient.users.get('me', null)
  .then((serviceAccountUser) =>{
    console.log('user.login', serviceAccountUser.login);
  }).catch((err) =>{
    console.log('err', err);
  });

// set up express-fileupload
app.use(fileUpload());

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
app.post('/upload', (req, res) =>{
  if(!req.files) return res.json({err: 'No file detected!'});
  const {uploadFile, uploadFile:{name:filename, mimetype}} = req.files;
  const {username, user_id, box_id} = req.body;

  const appUser = session.getAppAuthClient('user', box_id);
  console.log('appUser', appUser);

  session.getAppUserTokens(box_id, (session_err, tokenInfo)=>{
    if(session_err) console.log('session_err:', session_err);
    if(tokenInfo) {
      appUser.files.uploadFile('0', filename, uploadFile.data
      ).then((fileInfo)=>{
          console.log('fileInfo', fileInfo);
      }).catch((file_err)=>{
        if(file_err) console.log('file_err', file_err);
      })
    } else return res.json({err: 'No boxToken aquired.'})
  });

  // mkdir(`./files/${username}`, (err)=>{
  //   if(err) return res.json({err});
  //   uploadFile.mv(`./files/${username}/${filename}`, (er) =>{
  //     if(err) {
  //       console.log('er', er);
  //       return res.json({err: er});
  //     }
  //     db.any('INSERT INTO files (id, user_id, filename, mimetype) VALUES (DEFAULT, $1, $2, $3) RETURNING *', [user_id, filename, mimetype]).catch((e) =>{
  //       if(err) console.log('e', e);
  //       return res.json({err: e});
  //     }).then((data)=>{
  //       return res.json({message: 'Image uploaded successfully.', data});
  //     });
  //   });
  // });
});

// login
app.post('/login', (req, res)=>{

  const {username: usernm, password} = req.body;

  db.any('SELECT * FROM users WHERE username=$1 OR email=$1', [usernm]).catch((err)=>{
    if(err) {
      console.log('err', err);
      return res.json({err, message: 'Username or password is incorrect.'});
    }
  }).then((user)=>{

    if(!user[0]) return res.json({err: 'Username or password is incorrect!'});
    const {id, username, email, password_digest, box_id} = user[0];
    let boxToken;

    // generate token for user with box_id
    const appUser = session.getAppAuthClient('user', box_id);
    appUser.users.get(appUser.CURRENT_USER_ID, null, (app_err, apUser)=>{
      if(app_err) console.log('app_err', app_err);
      console.log('apUser', apUser);
    });

    session.getAppUserTokens(box_id, (session_err, tokenInfo)=>{
      if(session_err) console.log('session_err:', session_err);
      if(tokenInfo) {
        let boxToken = tokenInfo.accessToken;
        bcrypt.compare(password, password_digest, (bcrypt_err, cmp)=>{
          if(cmp){
            jwt.sign({id, username, email, box_id}, 'secret', {expiresIn: 15*60}, (jwt_err, token)=>{
              if(jwt_err) return res.json({err: jwt_err});
              return res.json({token, id, username, email, box_id});
            });
          }else{
            return res.json({err: bcrypt_err || 'Username or password is incorrect!'});
          }
        });
      } else return res.json({err: 'No boxToken aquired.'})
    });
  });
});

// create user
app.post('/users', (req, res)=>{
  const {password, username, email} = req.body;
  axios.post('https://api.box.com/2.0/users',
    {name: username, is_platform_access_only: true},
    {headers: {'Authorization': `'Bearer ${DEVTOKEN}'`}}
  ).catch(err =>{
    if(err) console.log('err', err);
  }).then(data =>{
    if(data){
      console.log('data:', data);
      bcrypt.hash(password, 10, (err, hash)=>{
        db.one(
          'INSERT INTO users (id, username, email, password_digest, box_id) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *',
          [username, email, hash, data.data.id]
        ).catch((err)=>{
          console.log(err);
          return res.json(err);
        }).then((user)=>{
          const {id, email, username, box_id} = user;
          jwt.sign({id, username, email, box_id}, 'secret', {expiresIn: (30)}, (err, token)=>{
            if(err) console.log('err', err);
            return res.json({token, id, username, email, box_id});
          });
        });
      });
    }
  })
});

// validate token
app.post('/validate', (req, res)=>{
  const {token} = req.body;
  jwt.verify(token, 'secret', (err, decoded)=>{
    if(err) return res.json({err});
    else if(decoded){
      db.any(`SELECT u.id, u.username, u.email, u.box_id, f.filename, f.id AS file_id, f.mimetype
              FROM users AS u JOIN files AS f
              ON u.id=f.user_id WHERE u.id=$1;`, [decoded.id])
      .catch((er)=>{
        if(er) console.log('er', er);
      }).then((data)=>{
        console.log('decoded', decoded);
        return res.json({decoded, data});
      });
    }
  });
});

app.post('/logout', (req, res)=>{
  const {id} = req.body;
  return res.json({id});
});

// get all users
app.get('/users', (req, res)=>{

});

// get single user info
app.get('/users/:id', (req, res)=>{

});

// update user
app.put('/users/:id', (req, res)=>{

});

// delete users
app.delete('/users/:id', (req, res)=>{

});
