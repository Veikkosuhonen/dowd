import express from "express"
import fs from "node:fs"
import crypto from "node:crypto"

const PORT = process.env.PORT

const app = express()

const hash = crypto.randomUUID()

const getString = () => {
    const timestamp = new Date().toISOString()
    return `${timestamp} ${hash}`
}

app.get('/log-output', (req, res) => {
    const str = getString()
    const pings = fs.readFileSync("files/pings", { encoding: "utf8" })
    res.send(`${str}.\nPing / Pongs: ${pings}`)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
