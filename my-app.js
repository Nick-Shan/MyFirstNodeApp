const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = (new Date).toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('logs/server.log', log +'\n', (err) => {
    if(err){
      console.log('Unable to log.');
    }
  });
  next();
});

//app.use((req, res, next) => {
//  res.render('maitenance.hbs');
//});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('upperOf',(text) => {
  return text.toUpperCase();
});

app.get('/',(req, res)=> {
  //res.send('Welcome');
  res.render('home.hbs',{
    pageTitle : 'MyApp',
    pageContent : 'Welcome to MyApp...'
  });
});

app.get('/About',(req, res)=> {
  /*res.send({
    name : 'Nick Shan',
    Likes : [
      'singing',
      'classical dancing',
      'speaking'
    ]
  });*/
  res.render('about.hbs',{
    pageTitle : 'MyApp',
    pageContent : {
      name : 'Nick Shan',
      Likes : [
        'singing',
        'classical dancing',
        'speaking'
      ]
    }
  });
});

app.get('/error',(req, res)=> {
  res.send('<h1>Unknown Error<h1>');
});

app.listen(port, () => {console.log(`Server is up on ${port}`);});
