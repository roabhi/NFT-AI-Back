const cors = require('cors')
const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

//Enable cors
app.use(cors())

const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:1234',
  'https://www.roabhi.es',
]

const corsOptions = {
  origin: allowedOrigins,
}

app.use(cors(corsOptions))

//Enabe body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//set static folder
// app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => {
  const result = `App is running on port ${port}`
  res.send(result)
})

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`listening at port ${port}`))
