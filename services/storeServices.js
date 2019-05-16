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
var findByOrderId = (req, res, next) => {
    let id = req.params.id;
    Order.find({ _id: id })
        .then(function (order) {

            if (order) {
                res.status(200).send(order);
            } else {
                res.status(404).send("Cannot find Order");
            }

        }).catch(function (err) {
            console.log(err);
            res.status(400).send("ID is wrong");
        });
}

module.exports = {
    createOrder,
    findByOrderId
}
