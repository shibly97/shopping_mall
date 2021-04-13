const express = require('express')
const router = express.Router()
const checkAccessToken = require('../checkAccessToken')
const {pool} = require('../database')

router.post('/cartItem',checkAccessToken,(req,res) => {
    console.log('user request for remove a item from cart')

    pool.query('delete from cart where userid=$1 and itemid=$2', [req.body.userid,req.body.itemid])
    .then(result => {
        console.log("item removed from cart")
        res.json({
            removed: true,
            message:"item successfully removed"
        })
    })
    .catch(err =>{
        console.log('error on removing item from cart', err)
        res.json({
            removed: false,
            message:"Issue with removing the item"
        })
    })
})   

module.exports = router