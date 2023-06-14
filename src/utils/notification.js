const { Messaging } = require('firebase-admin/messaging')
const app = require('../configs/firebase')

const Notification = new Messaging(app)

const send = async(token, notification) => {
    try {
        const message = {
            token,
            notification
        }
        await Notification.send(message)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
    
}

module.exports = {
    send
}