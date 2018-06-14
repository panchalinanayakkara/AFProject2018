const express = require('express');
const router = express.Router();
const Batch = require('../models/batch');
const Drug = require('../models/drug');
const mongoose = require('mongoose');

//get all
router.get('/', (req, res, next) => {
    Batch.find()
        .select(' _id drugid name number type content cartoons cards quantity man_date exp_date')
        .exec()
        .then(docs => {
            const responce = {
                count: docs.length,
                drugs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        drugid: doc.drugid,
                        name: doc.name,
                        number: doc.number,
                        type: doc.type,
                        content: doc.content,
                        cartoons: doc.cartoons,
                        cards: doc.cards,
                        quantity: doc.quantity,
                        man_date: doc.man_date,
                        exp_date: doc.exp_date
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json(err);
        });
});

//post product
router.post('/', (req, res, next) => {
    const batch = new Batch({
        _id: new mongoose.Types.ObjectId(),
        drugid: req.body.drugid,
        name: req.body.name,
        number: req.body.number,
        type: req.body.type,
        content: req.body.content,
        cartoons: req.body.cartoons,
        cards: req.body.cards,
        quantity: req.body.quantity,
        man_date: req.body.man_date,
        exp_date: req.body.exp_date
    });
    batch
        .save()
        .then(result => {
            Update(req.body.drugid, req.body.quantity);
            res.status(201).json({
                id: result._id
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete service
router.delete('/:batchID', (req, res, next) => {
    const id = req.params.batchID;
    Batch.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                message: "Batch deleted"
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function Update(drugid, size) {
    Drug.update({ _id: drugid }, { $set: { record_level: size } })
        .exec()
        .then(result => {
            res.status(200).json({
                code: 201
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

module.exports = router;