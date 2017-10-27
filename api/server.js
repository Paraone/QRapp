const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const fs = require('fs');

// Set up the express app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Origin, Content-Type, Accept'
}

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", 'POST,GET,DELETE,PUT');
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   next();
// })

app.use(fileUpload());

app.listen(3030, () => {
  console.log('App listening on port 3030');
});

app.use('/', cors());
app.get('/', (req, res)=>{
  res.json({message: 'Connected'});
});

app.use('/upload', cors());
app.post('/upload', upload.single('picfile'), (req, res)=>{
  console.log('req.body', req.body);
  console.log('req.files', req.files);
  if(!req.files) return res.json({message: 'No file uploaded'});
  let uploadFile = req.files;

  fs.appendFile(`./files/${uploadFile.img.name}`, uploadFile.img.data, (err, data)=>{
    if(err) console.log(err);
    res.json({message: 'Uploaded!'})
  });
});
