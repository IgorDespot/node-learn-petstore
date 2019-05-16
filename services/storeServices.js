const Order = require('../models/Order');

var createOrder = (req, res, next) => {
    Order.create(req.body)
        .then(function (order) {
            res.send(order);
        }).catch(function (err) {
            console.log(err);
            res.status(404).send("Cannot create Order");
        });
}


module.exports = {
    createOrder
}
