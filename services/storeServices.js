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

            if (order.length > 0) {
                res.status(200).send(order);
            } else {
                res.status(404).send(`Can not find Order with id ${orderId}`);
            }

        }).catch(function (err) {
            console.log(err);
            res.status(400).send("ID is wrong");
        });
}
var removeOrder = (req, res, next) => {

    let orderId = req.params.id;

    Order.remove({ _id: orderId })
        .then(order => {
            if (order.deletedCount > 0) {
                res.status(200).send(order)
            } else {
                res.status(404).send(`Can not find Order with id ${orderId}`)
            }
        })
        .catch((err) => {
            res.status(400).send(`ID is wrong`);
        })
}
module.exports = {
    createOrder,
    findByOrderId,
    removeOrder
}
