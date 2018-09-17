const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// include models file
const mUser = require('../models/MUser');


/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});
/* POST */
router.post('/register', (req, res, next) =>{
  const {username, password} = req.body;
  // password şifrelemek(hash)
  bcrypt.hash(password, 10).then((hash) =>{
    const user = new mUser({
      username,
      password: hash
    });
    const promise = user.save();
    promise.then((data) =>{
      res.json(data);
    }).catch((err) =>{
      res.json(err);
    });
  });
});
// kimlik doğrulama, token işlemleri
router.post('/authentication', (req, res, next) =>{
  const {username, password} = req.body;
  mUser.findOne({
    username
  }, (err, user) =>{
      if(err) throw err;
      if(!user){
        res.json({
          status: false,
          message: 'authentication failed, user not found!'
        });
      }
      else{
        bcrypt.compare(password, user.password).then((result) =>{
          if(!result){
            res.json({
              status: false,
              message: 'authentication failed, wrong password!'
            });
          }
          else{
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn : 720 // 12 saat
            });
            res.json({
              status : true,
              token
            });
          }
        });
      }
  });
});

module.exports = router;
