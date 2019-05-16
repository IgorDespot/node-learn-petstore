const express = require('express')
const router = express.Router();
const {
    deleteUser
} = require('../services/userServices');

router.delete('/:username', deleteUser);

module.exports = router;