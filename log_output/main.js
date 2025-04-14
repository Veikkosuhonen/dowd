import crypto from "crypto"

const rndString = crypto.randomUUID()

setInterval(() => {
    const timestamp = new Date().toISOString()
    console.log(`${timestamp} ${rndString}`)
}, 5000)
