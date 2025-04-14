import crypto from "node:crypto"
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
