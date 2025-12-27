const Pusher = require("pusher")

const APPID='938985'
const KEY='3252bb191d77e92ddb3c'
const SECRET='2a3dd823cd1abcd45c71'
const CLUSTER='us3'
const USETLS=true
const CHANNEL='patentrack-channel'
const EVENT='patentrack-event'

const pusher = new Pusher({
    appId: APPID,
    key: KEY,
    secret: SECRET,
    cluster: CLUSTER, 
    useTLS: USETLS,
    keepAlive: true,
})


const sendNotification = (message) => {
    pusher.trigger(CHANNEL, EVENT, message)
}
const argumentSlice = process.argv.slice(2)   
const message = argumentSlice[0]
if(message != '') {
    sendNotification(message)
}
