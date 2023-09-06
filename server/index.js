const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./Middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require ('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://qwerty:qwerty123@cluster0.noiw9jz.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()