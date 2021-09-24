const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('./backend/routes/Schemas/db')
const helmet = require('helmet')

mongoose.connection.on('open', () => {
  console.log('DB on')
  const session = require('express-session')
  const MongoStore = require('connect-mongo')(session)

  //post, get時的解碼
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  //basic security settings
  // app.use(helmet())

  //session 設定
  //參考網站https://www.cnblogs.com/chyingp/p/nodejs-learning-express-session.html
  app.use(
    session({
      name: 'eeplus',
      secret: 'fuewhzk', // 用来對session id相關的cookie進行簽名，建議128byte亂碼
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      }),
      saveUninitialized: false, // 是否自动保存未初始化的會話，建議false
      resave: false, // 是否每次都重新保存會話，建議false
      cookie: {
        // secure: process.env.NODE_ENV === 'production', //only allow https request
        // domain: process.env.domain, //default undefined
        httpOnly: true, //false前端可read和set
        maxAge: 60 * 60 * 1000, // 有效期(ms)
      },
    }),
  )

  //backend
  app.use('/api', require('./backend/routes/api'))

  //frontend
  if (!process.env.HERO) {
    const connectHistoryApiFallback = require('connect-history-api-fallback')
    app.use(
      connectHistoryApiFallback({
        verbose: false,
      }),
    )
    const JSON_DIR = path.join(__dirname, './client/public') // for develop
    const DIST_DIR = path.join(__dirname, './client/dist')
    const HTML_FILE = path.join(__dirname, './client/dist/index.html')
    app.use(express.static(DIST_DIR))
    app.use(express.static(JSON_DIR)) // for develop
    app.get('/', (req, res) => {
      res.sendFile(HTML_FILE) // EDIT
    })
  }

  //server on
  app.listen(process.env.PORT || 1993, () => {
    if (process.env.HERO) {
      const { wakeDyno } = require('heroku-keep-awake')
      wakeDyno('https://eeplus-back.herokuapp.com/', {
        logging: false,
        stopTimes: { start: '16:00', end: '00:00' }, //time zone +0，so -8hr
      })
    }
    console.log(`Server is up on port ${process.env.PORT || 1993}.`)
  })
  //https server
  // connect to https://localhost:1993
  // const fs = require('fs')
  //  const options = {
  //  key: fs.readFileSync('./certificate.key'),
  //  cert: fs.readFileSync('./certificate.crt')
  // };
  // const https = require('https');
  // https.createServer(null, app).listen(process.env.PORT||1993, () => {
  //   console.log(`Server is up on port ${process.env.PORT || 1993}.`)
})
