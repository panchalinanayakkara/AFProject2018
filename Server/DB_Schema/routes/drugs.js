const express = require('express');
const router = express.Router();
const Drug = require('../models/drug');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Drug.find()
        .select(' _id name price type category danger_level record_level remarks')
        .exec()
        .then(docs => {
            const responce = {
                count: docs.length,
                drugs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        type: doc.type,
                        category: doc.category,
                        danger_level: doc.danger_level,
                        record_level: doc.record_level,
                        remarks: doc.remarks
                    }
                })
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json(err);
        });
});

//post product
router.post('/', (req, res, next) => {
    const drug = new Drug({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        category: req.body.category,
        danger_level: req.body.danger_level,
        record_level: req.body.record_level,
        remarks: req.body.remarks
    });
    drug
        .save()
        .then(result => {
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
router.delete('/:drugID', (req, res, next) => {
    const id = req.params.drugID;
    Drug.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                message: "Drug deleted"
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;
