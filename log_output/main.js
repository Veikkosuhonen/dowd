import express from "express"
import crypto from "node:crypto"

const PORT = process.env.PORT

const rndString = crypto.randomUUID()

const getString = () => {
    const timestamp = new Date().toISOString()
    return `${timestamp} ${rndString}`
}

setInterval(() => {
    console.log(getString())
}, 5000)

const app = express()

app.get('/', (req, res) => {
    res.send(getString())
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
