import express from "express"

const app = express()

const PORT = process.env.PORT

if (!PORT) {
    console.error("Warning: PORT not set")
}

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
