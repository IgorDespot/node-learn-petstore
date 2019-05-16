const User = require('../models/User');


// ** USER LOGIN **
let login = (req, res, next) => {
    logger.info(`POST fired: login user ${req.body.username} , ${Date(Date.now())}`);

    // find user with requested username
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (!user) {
            return res.status(400).send({
                message: `User ${req.body.username} not found.`
            });
        } else {
            if (user.validPassword(req.body.password)) {
                const token = user.generateJwt();

                return res.status(201).send({
                    message: `User ${req.body.username} logged in`,
                    token: token
                })
            } else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
};

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

module.exports = {
    login,
    deleteUser
}