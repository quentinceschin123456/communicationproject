const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 8000

express()
    .use(express.static(path.join(__dirname, 'ressources')))
    .use(express.static(path.join(__dirname, 'src/views')))
    .set('views', path.join(__dirname, 'src/views'))
    .set('view engine', 'ejs')
    .engine('html', require('ejs').renderFile)
    .engine('css', require('ejs').renderFile)
    .engine('js', require('ejs').renderFile)
    .get('/', (req, res) => res.render('index.html'))
    .get('/accueil', (req, res) => res.render('index.html'))
    .get('/console', (req, res) => res.render('console.html'))
    .get('/directInfos', (req, res) => res.render('directInfos.html'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))