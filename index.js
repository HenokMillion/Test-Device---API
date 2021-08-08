const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const dbService = require('./services/db.service');
const router = require('./routes/index.router');
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())
app.use('/api/v1', router)
app.use('*', (req, res, next) => {
    return res.status(404).json({status: 404, error: 'resource not found', success: false})
})

dbService.connectDB(true)

const appListener = app.listen(process.env.PORT || 8080, () => {
    console.log(`App running on port: ${appListener.address().port}`)
})
