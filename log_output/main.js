import express from "express"
import crypto from "node:crypto"
import axios from "axios"

const PORT = process.env.PORT

const PINGPONG_URL = process.env.PINGPONG_URL

const app = express()

const hash = crypto.randomUUID()

const getString = () => {
    const timestamp = new Date().toISOString()
    return `${timestamp} ${hash}`
}

app.get('/log-output', async (req, res) => {
    const str = getString()

    const pingPongRes = await axios.get(`${PINGPONG_URL}/pings`)
    const pings = pingPongRes.data
    console.log("PingPong response: " + pings)

    res.send(`${str}.\nPing / Pongs: ${pings}`)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
