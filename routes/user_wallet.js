var util = require('util');
var mongoose = require('mongoose');
var User = require('../models/user');
var UserWallet = require('../models/user_wallet');
var express = require('express');
var router = express.Router();

router.get('/user/:id/wallet', function (req, res) {
    var id = req.params.id;

    User.where({_id: id})
        .exec(function (err, user) {
            if (err) {
                res.statusCode = 404;
                res.json({message: "User not found"});
            } else {
                UserWallet.where({owner: id})
                    .exec(function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.statusCode = 200;
                            res.json(result);
                        }
                    });
            }
        });
});

router.post('/user/:id/wallet', function (req, res) {
    var id = req.params.id;

    User.where({_id: id})
        .exec(function (err, user) {
            if (err) {
                res.statusCode = 404;
                res.json({message: "User not found"});
            } else {
                var userWallet = UserWallet();

                userWallet._id = mongoose.Types.ObjectId()
                userWallet.name = req.body.name;
                userWallet.amount = req.body.amount;
                userWallet.externalId = req.body.externalId;
                userWallet.owner = id;

                userWallet.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.statusCode = 201;
                        res.json(userWallet);
                    }
                });
            }
        });
});

module.exports = router;