const express = require('express')
const router = express.Router();
const checkAuth = require('../util/isAuth');
const {
    deleteUser, 
    getAllUsers,
    login,
    addUser,
    getUserByUsername
} = require('../services/userServices');

router.delete('/:username', deleteUser);
router.post('/adduser',addUser);
router.post('/login',login);
router.get('/:username', getUserByUsername);
router.get("/users",checkAuth,getAllUsers);

module.exports=router;
