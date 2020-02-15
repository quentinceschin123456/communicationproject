const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, 'ressources')))
  .set('views', path.join(__dirname, 'src/views'))
  .set('view engine', 'ejs')
  .engine('html', require('ejs').renderFile)
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))