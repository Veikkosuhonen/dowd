import express from "express"

const PORT = process.env.PORT

const app = express()

let counter = 0

app.get('/pingpong', (req, res) => {
    // Increment the counter
    counter++
    console.log("Incremented counter to " + counter)
    // Send the response
    res.send("pong " + counter)
})

app.get('/pings', (req, res) => {
    res.send(counter)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
