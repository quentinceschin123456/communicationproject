const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'src/views'))
  .get('/', (req, res) => res.render('views/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))