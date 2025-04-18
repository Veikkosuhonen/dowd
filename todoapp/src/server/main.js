import crypto from "node:crypto"
import fs from "node:fs"
import pkg from 'follow-redirects'
const { https } = pkg
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan('tiny'))

const PORT = process.env.PORT || 8000

if (!PORT) {
    console.error("Warning: PORT not set")
}

const router = express.Router()

const hash1 = crypto.randomUUID()

router.get('/hash', (req, res) => {
    const hash2 = crypto.randomUUID()

    res.send(`App ${hash1}, request ${hash2}`)
})

// Create a folder to store images. Should be at application root
const imagesFolder = path.join(dirname(fileURLToPath(import.meta.url)), '../../images')

if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder)
    console.log("Created folder: ", imagesFolder)
}

const downloadAndSendImage = (res) => {
    // Download image from https://picsum.photos/
    // and save it to the images folder
    const imageUrl = 'https://picsum.photos/200/300'
    const imageName = Date.now() + '.jpg'
    const imagePath = path.join(imagesFolder, imageName)

    const file = fs.createWriteStream(imagePath)

    return https.get(imageUrl, (response) => {
        if (response.statusCode >= 400) {
            console.error("Error downloading image: ", response.statusCode)
            res.status(500).send("Error downloading image")
            return
        }

        response.pipe(file)

        file.on('finish', () => {
            file.close()
            console.log("Downloaded image: ", imageName)
            res.sendFile(imagePath)
        })

    }).on('error', (err) => {
        fs.unlink(imagePath, () => {})
        console.error("Error downloading image: ", err)
        res.status(500).send("Error downloading image")
    })
}

router.get('/image', (req, res) => {
    // Images folder has one image, the name is its timestamp.
    // Find the files in folder images
    let images = fs.readdirSync(imagesFolder)

    // Check if there are images
    if (images.length === 0) {
        console.log("No images found, downloading one...")
        downloadAndSendImage(res)
        return
    }

    // Get the first image
    const image = images[0]

    // Check if the image is older than 10 minutes
    const stats = fs.statSync(path.join(imagesFolder, image))
    const now = new Date()
    const timelimit = 10 * 60 * 1000
    if (now - stats.mtime > timelimit) {
        console.log("Image is older than 10 minutes, downloading a new one...")
        // Delete the old image
        fs.unlinkSync(path.join(imagesFolder, image))
        // Download a new image
        // and send it
        downloadAndSendImage(res)
        return
    }

    // Get the path of the image
    const imagePath = path.join(imagesFolder, image)

    // Send the image
    res.sendFile(imagePath)
})

app.use('/api', router)


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    const DIST_PATH = path.resolve(dirname(fileURLToPath(import.meta.url)), '../../dist')
    const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')
  
    app.use(express.static(DIST_PATH))
    app.get('/*x', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
