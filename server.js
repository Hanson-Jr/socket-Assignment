
const Server = require ('socket.io')
// const socket = require("./socketControl")
const app = require("./app")


const dotenv = require("dotenv")

 

dotenv.config()

const Port = process.env.PORT || 5000

const HostName = process.env.HOSTNAME




app.listen(Port, ()=>{
  console.log(`app is running http://${HostName}:${Port}`)
})



