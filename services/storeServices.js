const Order = require('../models/Order');
const Pet = require('../models/Pet');


let createOrder = (req, res, next) => {
    Order.create(req.body)
        .then(function (order) {
            res.send(order);
        }).catch(function (err) {
            console.log(err);
            res.status(404).send("Cannot create Order");
        });
}


let findByOrderId = (req, res, next) => {
    let id = req.params.id;
    Order.find({
            _id: id
        })
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


let removeOrder = (req, res, next) => {
    let orderId = req.params.id;
    Order.remove({
            _id: orderId
        })
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
};


// GET STORE INVENTORY
// **
let getInventory = (req, res, next) => {
    Pet.aggregate([{
            "$group": {
                _id: "$status",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "total": -1
            }
        }
    ]).then(invent => {
        res.status(200).send(invent);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
};




module.exports = {
    createOrder,
    findByOrderId,
    removeOrder,
    getInventory
}