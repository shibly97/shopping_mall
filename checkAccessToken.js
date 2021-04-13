const jwt= require('jsonwebtoken');

const checkAccessToken = (req,res,next) =>{
    console.log('checking the accesstoken')

    if(!req.body.accesstoken){
        console.log("Accesstoken is missing")
        return res.json({
            authorized: false,
            err:"accesstoken missing"
        })
    }
    // console.log(req.body.accesstoken)
    jwt.verify(req.body.accesstoken,process.env.jwtAccessSecret,(err,desirealized) => {
        if(err){
            console.log('accesstoken is probably outdated',err)
            return res.json({
                authorized: false,
                err:"issue with the accesstoken"
            })
        }
        req.user = desirealized
        next()
    })
}

module.exports = checkAccessToken