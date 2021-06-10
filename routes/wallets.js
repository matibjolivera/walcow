const express = require("express");
const router = express.Router();


const Wallet = require("../models/Wallet");
const User = require("../models/TokenWallet");


/**
 * Getters Methods.
 * 
 */

router.get("/", async (req, res) => {
    res.send(await Wallet.find());
});



/**
 * Post Methods.
 * 
 */

 router.post("/:user", async function (req, res) {

    if (!req.body
            || !req.params.user
            ) {

        return res.status(400).send({
            error: true
            , message: "Mandatory fields was not found in body"
        });
    }


    let user = await User.findOne({
        user: req.params.user
    });

    if (user) {
        return res.status(404).send({
            error: true
            , message: 'User not found.'
        });
    }

    let existingWallet = await Wallet.findOne({
        user: req.params.user
    });

    
    if (existingWallet) {
        return res.status(400).send({
            error: true
            , message: 'Wallet already exists.'
        });
    }


    let newWallet = new Wallet({
        user: req.params.user
    });


    await newWallet.save();

    res.send(newWallet);
});


module.exports = router;