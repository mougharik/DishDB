const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users')
const port = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))
app.use('/users', userRouter)

app.listen(port, () => {
  console.log('Server is up and listening on port ' + port)
})