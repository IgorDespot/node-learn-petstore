const User = require('../models/User');
const logger = require('../util/logger');
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



var deleteUser = (req,res,next) => {
    let newUsername = req.params.username;
    User.remove({username: newUsername})
    .then(user => {
        res.status(200).send(user)
    })
    .catch((err) => {
        res.status(400).send('Failed to delete user by username ' + `${newUsername}`);
    })
 }





var addUser = (req, res, next) => {
   logger.info(`POST fired: add user ${req.body.username} , ${Date(Date.now())}`);
    User.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "This user already exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password: hash,
                phone:req.body.phone,
                userStatus:req.body.userStatus
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  logger.info("User addition passed");
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  logger.error("User addition didnt pass");
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };
  
  
  var login=(req, res, next) => {
   logger.info(`POST fired: login user ${req.body.username} , ${Date(Date.now())}`);
    User.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length < 1) {
          logger.error('User with this credentials does not exist'); 
          return res.status(401).json({
            message: "Auth failed"
            
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            logger.error('Auth failed'); 
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user[0].username,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          logger.error('Auth failed'); 
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  
  
  var getAllUsers = (req, res, next) => {

    User.find().then(function(users){
      console.log(users);
    logger.info('Show all users requested '); 
      res.send(users);
     }).catch(function (err) {
      logger.error('Show all users failed'); 
      res.status(404).send("Cannot find users");
    })
  };
  module.exports = {
    login,
    deleteUser,
    addUser,
    getAllUsers
}