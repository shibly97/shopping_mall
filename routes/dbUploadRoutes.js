const express = require('express')
const router = express.Router()
const checkAccesstoken = require('../checkAccessToken')
const {pool} = require('../database')

router.post('/addToCart',checkAccesstoken,(req,res)=>{
    console.log('user try to add item to cart')
    pool.query(' select from cart where userid=$1 and itemid=$2',[req.body.userid,req.body.itemid])
    .then(result => {
      
        if(result.rowCount < 1){
            pool.query('insert into cart(userid,itemid,quantity,price,main_image,title,one_time_sell,discount) values ($1,$2,$3,$4,$5,$6,$7,$8)',[req.body.userid,req.body.itemid,req.body.quantity,req.body.price,req.body.main_image,req.body.title,req.body.one_time_sell,req.body.discount])
            .then(result => {
                console.log("added item to cart")
                return res.json({
                    added:true,
                    message:'Successfully added to cart'
                })
            })
            .catch(err => {
                console.log('error adding to cart', err)
                return res.json({
                    message:"Issue with adding to cart"
                })
            })}
        else if(result.rowCount > 0){
            console.log("Item already added to cart")
            return res.json({
                added:true,
                message:"Item already added to cart"
            })
        }
    }).catch(err => {
        console.log("error on searching the cart item" ,err)
        return res.json({
            added:false,
            message: "Something went wrong try again"
        })
    })


})

module.exports = router