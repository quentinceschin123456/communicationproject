const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, 'ressources')))
  .set('view engine', 'ejs')
  .engine('html', require('ejs').renderFile)
  .engine('css', require('ejs').renderFile)
  .engine('js', require('ejs').renderFile)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  .use(express.static(path.join(__dirname, 'src/views')))
  .set('views', path.join(__dirname, 'src/views'))
  .get('/', (req, res) => res.render('index.html'))
  .get('/console', (req, res) => res.render('index.html'))
