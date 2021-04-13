const express = require('express')
const app = express();

app.use(express.json())

app.use('/api/', require('./routes/dbApiRoutes'))

app.use('/auth/', require('./routes/authRoutes'))

app.use('/upload', require('./routes/dbUploadRoutes'))

app.use('/remove',require('./routes/dbDeleteRoutes'))

app.use('/',(req,res) =>{
    res.send(404)
})

app.listen(5000, () =>{
    console.log("Main Server is running in port 5000")
})