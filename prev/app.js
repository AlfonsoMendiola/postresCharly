
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const {v4: uuid} = require('uuid');

const app = express();

//configuracion de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname))
  }
})

//conexion a db
const mongoose = require('mongoose');
//conexion local
const uri = 'mongodb://localhost:27017/postres-charly';

const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
mongoose.connect(uri, options).then(
  () => { console.log('conectado a mondo db'); },
  err => { err }
);

// Middleware --estos iempre se ejecutan antes de las rutas--
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/uploads')
}).single('image'));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));
app.use('/api/producto', require('./routes/producto'));
app.use('/api/venta', require('./routes/venta'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('escuchando en el puerto: '+ app.get('puerto'));
});