const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views',__dirname + '/views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret:'this is a secret',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge: null}
  })
)
app.use(function(req, res, next){
  if(req.session.usr){
    req.isAuthenticated = true
  }
  else{
    req.isAuthenticated = false
  }
  console.log(req.isAuthenticated, req.session.usr, 'session')
  next()
})
app.get('/', function(req, res){
  if(req.isAuthenticated){
    console.log(req.session.usr);
    res.render('home', {username: req.session.usr})
  }
  else{
    res.redirect('/login')
  }
})

app.get('/login', function(req, res){
  res.render('login')
})
app.post('/login', function(req, res){
  const loginUser = dal.getUserByUsername(req.body.username)
  console.log('loginUser', loginUser)
  if(loginUser.password === req.body.password){
    req.session.usr = {username: loginUser.username}
    res.redirect('/')
  }
  else{
    res.send('nope')
  }
})
app.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/login')
})

app.set('port', 3000)
app.listen(3000, function(){
  console.log('app is running')
})
