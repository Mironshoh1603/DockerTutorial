const express = require('express')
const app = express()
const redis= require("redis")
const port = 3000

const clientDB= redis.createClient({
    host:'redis-server',
    port:6379
})
clientDB.set('visits',10)




app.get('/', (req, res) =>{
    clientDB.get("visits",(err,visits)=>{
        res.send("Visits number is ",visits)
        clientDB.set('visits',visits+1)
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))