const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, 'ressources')))
  .set('views', path.join(__dirname, 'src/views'))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))