import express from "express"
import fs from "node:fs"

const PORT = process.env.PORT

const app = express()

app.get('/pingpong', (req, res) => {
    // Check if the file exists
    if (!fs.existsSync('files/pings')) {
        // Create the file with the initial value of 0
        fs.writeFileSync('files/pings', '0')
    }
    // Read the file
    const str = fs.readFileSync('files/pings', { encoding: "utf8" })
    // Contains the number of pings
    let counter = parseInt(str.toString())
    // Increment the counter
    counter++
    // Write the new value back to the file
    fs.writeFileSync('files/pings', counter.toString())
    
    console.log("Incremented counter to " + counter)
    // Send the response
    res.send("pong " + counter)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
