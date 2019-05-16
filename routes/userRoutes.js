const express = require('express')
const router = express.Router();
const checkAuth = require('../util/isAuth');
const {
    deleteUser, 
    getAllUsers,
    login,
    addUser
} = require('../services/userServices');

router.delete('/:username', deleteUser);
router.post('/adduser',addUser);
router.post('/login',login);

router.get("/users",checkAuth,getAllUsers);

module.exports=router;
