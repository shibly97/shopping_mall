const express = require('express')
const router = express.Router()
const {pool} = require('../database')
const checkAccessToken = require('../checkAccessToken')

router.get('/main_cat', (req,res) =>{
    console.log("user requesting main_cat ")

    pool.query('select distinct main_cat from item',(err, result) =>{
        if(err){console.log(err)}
        const main_cat = result.rows.map(object =>{
            return object.main_cat
        })
        
        res.json(main_cat)
    })
})
   
router.get('/sub_cat', (req,res) =>{
    console.log("user requesting sub_cat")

    pool.query(' select distinct sub_cat, main_cat from item',(err, result) =>{
        if(err){console.log(err)}
        res.json(result.rows)
    })
})

router.post('/getItems', (req,res) =>{
    console.log("requesting for get items " + req.body.offset)

    pool.query('select item_id, added_date,price_negotiable,one_time_sell, rating,price,discount,title,main_image from item limit 30 offset $1',[req.body.offset],(err, result) =>{
        if(err){console.log(err)}
        res.json(result.rows)
    })
})

router.post('/getCatItems/', (req,res) =>{
    console.log("requesting for get cat items" + req.body.offset+ "for" + req.body.cat)

    pool.query(' select item_id, added_date,price_negotiable,one_time_sell,rating,price,discount,title,main_image from item where sub_cat=$1 limit 30 offset $2',[req.body.cat, req.body.offset],(err, result) =>{
        if(err){console.log(err)}
        res.json(result.rows)
    })
})

router.post('/oneItem', (req,res) =>{

    let response = {}

    console.log("get request for one item")
    // here i need to go for 2 query
    // to get all images for the item from itemimage table
    // this will be beautiful if we use async function 
    pool.query('select item.discription,item.discount,item.item_id,item.brand,item.rating,item.price_negotiable,item.price, item.one_time_sell, item.title,item.owner_id,item.main_image, partner.firstname, partner.city,partner.country,partner.mobile, partner.email from item join partner on item.owner_id=partner.userid and item.item_id=$1',[req.body.item_id],(err, result) =>{
        if(err){console.log(err)}
        response.item = (result.rows[0])
        
        pool.query('select url from item_image where item_id=$1',[req.body.item_id],(err, result) =>{
            if(err){console.log(err)}
            response.itemImages = (result.rows)
            console.log(result.rows)
            console.log(response)
            res.json(response)
        })
    })

})

router.post('/getCart',checkAccessToken,(req,res) =>{
    console.log('user requesting cart')

    pool.query('select itemid,quantity,price,main_image,title,one_time_sell,discount from cart where userid=$1',[req.body.userid])
    .then(result => {
        res.json({cart:result.rows})
    })
    .catch(err =>{
        console.log('error on getting cart', err)
        res.json({
            cart:false,
            err:'issue on cart'
        })
    })
   
})

module.exports = router