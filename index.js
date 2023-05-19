import { PORT } from './config/environment.js'
import { logger } from './logs/winston.js'
import express from 'express'
import connectToMongoDB from './config/connectToDbMongo.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, async () => {
    try{
        await connectToMongoDB()
        logger.info(`Listening on port: ${PORT}, process ${process.pid}`)
    }catch(error){
        logger.warn(`We has problems: ${error.message}`)
    }
})