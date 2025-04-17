import crypto from "node:crypto"
import fs from "node:fs"

const rndString = crypto.randomUUID()

const getString = () => {
    const timestamp = new Date().toISOString()
    return `${timestamp} ${rndString}`
}

try {
    fs.mkdirSync('files')
} catch (e) {
    console.warn("Something went wrong when creating files: ", e)
}

setInterval(() => {
    fs.writeFile('files/logfile', getString() + '\n', { flag: 'a+', encoding: "utf8" }, err => {});
}, 5000)
