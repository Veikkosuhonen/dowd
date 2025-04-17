import express from "express"

const PORT = process.env.PORT

let counter = 0

const app = express()

app.get('/pingpong', (req, res) => {
    counter++
    console.log("Incremented counter to " + counter)
    res.send("pong " + counter)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
