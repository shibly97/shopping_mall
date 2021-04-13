const express = require('express')
const router = express.Router()
const {pool} = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const checkAccesstoken = require('../checkAccessToken')

const salt = 10;

router.post('/register',(req,res)=>{
    console.log("new user try to register")

    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    pool.query('insert into partner (userid,firstname,mobile,password,username) values(uuid_generate_v4(),$1,$2,$3,$4)',[req.body.firstname,req.body.mobile,hashPassword,req.body.username])
    .then(result => {
        console.log("Successfully registered")
        res.json({
            register: true
         })
    })
    .catch(err => {
       if(err.constraint="partner_username_key"){
           res.json({
               register: false,
               err: "Username already exists"
            })
       }else{
           res.json({
               register: false,
               err: "something went wrong"
            })
       }
       console.log(err)
    })
})

router.post('/login', (req,res)=> {
    console.log("user try to login")

    pool.query('select password,userid from partner where username=$1',[req.body.username])
    .then(result => {

        if(result.rowCount<1){
            console.log('No such user found')
            res.json({
                authorized: false,
                err : 'username or password is incorrect'
            })
        }
        
        const comparePassword = bcrypt.compareSync(req.body.password, result.rows[0].password)

        if(comparePassword){
            console.log('user exists and correct password')

            const serialize = {
                userid: result.rows[0].userid,
            }

            const accessToken = jwt.sign(serialize,process.env.jwtAccessSecret,{expiresIn:60*60*6})
            const refreshToken = jwt.sign(serialize,process.env.jwtRefreshSecret,{expiresIn:60*60*48})

            console.log(accessToken)

            pool.query('insert into refreshtoken (userid, refreshtoken) values ($1,$2)',[serialize.userid,refreshToken])
            .then(res => {
                console.log("refreshtoken stored to DB")
            })
            .catch(err => {
                console.log("issue with sotring refreshtoken")
                console.log(err)
            })

            res.json({
                authorized: true,
                user_id: result.rows[0].userid,
                accesstoken: accessToken, 
                refreshtoken: refreshToken
            })

        }else{
            console.log('user exists but incorrect password')
            res.json({
                authorized: false,
                err : 'username or password is incorrect'
            })
        }

    }).catch(err =>{
        console.log("query error" + err)
        res.json({ 
            authorized: false,
            err : 'Something went wrong'
        })
    })
    
})


router.post('/checkRefreshtoken', (req,res) => {
    console.log('user checkrefreshtoken')

    const token = req.body.refreshtoken

    jwt.verify(token, process.env.jwtRefreshSecret,(err,desirealize) =>{
        if(err){
            console.log(err)
            res.json({
                authorized: false,
                err: "Issue with refreshtoken"
            })
        }
        
        pool.query('select * from refreshtoken where refreshtoken=$1',[token])
        .then(result => {
            if(result.rowCount < 1){
                return res.json({
                    authorized: false,
                    err:"User loged out or refreshtoken renewed"
                })
            }
            const accessToken = jwt.sign({userid:desirealize.userid},process.env.jwtAccessSecret,{expiresIn:60*60*6})
            const refreshToken = jwt.sign({userid:desirealize.userid},process.env.jwtRefreshSecret,{expiresIn:60*60*48})

            pool.query('update refreshtoken set refreshtoken=$1 where refreshtoken=$2',[refreshToken,token])
            .then(res => { console.log('New refreshtoken Updated to DB')})
            .catch(err => {console.log("Issue with updating new refreshtoken", err)})
            
            console.log("New refreshtoken and accesstoken are sent")
            res.json({
                authorized: true,
                accesstoken: accessToken,
                refreshtoken: refreshToken,
                user_id: desirealize.userid
            })

        })  

    })
})

router.post('/checkAccesstoken',checkAccesstoken,(req,res)=> {
    console.log('accesstoken valid user authorized')
    res.json({
        authorized: true,
        user_id: req.user.userid,

    })
})

router.post('/logout', (req,res) =>{
    console.log("user try to remove refreshtoken")
    console.log(req.body.refreshtoken)
    pool.query('delete from refreshtoken where refreshtoken=$1',[req.body.refreshtoken])
    .then(result=>{
        res.json({
            res:"User successfully logedout"
        })
    }).catch(err =>{
        console.log("error on removing refreshtoken", err)
        res.json({
            res:'Issue on logout'
        })
    })
})

module.exports = router