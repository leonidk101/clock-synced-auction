import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, World')
})

console.group()

console.log(`Application version ${process.env.VERSION}`)
console.log(`Running on port ${process.env.PORT}...`)

console.groupEnd()

app.listen(process.env.PORT)
