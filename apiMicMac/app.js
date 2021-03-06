const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const xmlparser = require('express-xml-bodyparser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const point2dRouter = require('./routes/point2d')
const point3dRouter = require('./routes/point3d')
const calibRouter = require('./routes/calib')
const asproRouter = require('./routes/aspro')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(xmlparser({
  normalizeTags: false
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/point2d', point2dRouter)
app.use('/point3d', point3dRouter)
app.use('/calib', calibRouter)
app.use('/aspro', asproRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
