const express=require('express')
const app=express()
// app.use(express.static('./dist'))
app.use(express.static('./h5'))
app.listen(80,()=>{
    console.log("server running at http://127.0.0.1:80")
})