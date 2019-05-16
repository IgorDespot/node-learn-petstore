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



module.exports = {
    login
}