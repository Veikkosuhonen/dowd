import express from "express"
import fs from "node:fs"

const PORT = process.env.PORT

const app = express()

app.get('/log-output', (req, res) => {
    const content = fs.readFileSync("files/logfile", { encoding: "utf8" })
    res.send(content)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
