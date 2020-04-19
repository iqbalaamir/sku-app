var expr = require('express');
const hbs = require('hbs');
const _ = require('lodash');
const fs = require('fs');

var app = expr();

const port = process.env.PORT || 9000;

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    console.log("Running" + new Date().getDate());
    next();
})

app.use((req, res, next) => {
    var log = `${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('somefile.log', log + '\n', (err) => {
        if (err) {
            console.log("Some Issue");
        }
    });
    next();
})

app.get('/', (req, res) => {

    res.render('Home_page.hbs', {
        pageTitle: 'Home'
    });
});

app.get('/About', (req, res) => {
    res.render('About_page.hbs', {
        pageTitle: 'About us'
    });
});

app.get('/Contact', (req, res) => {
    res.render('Contact.hbs', {
        pageTitle: 'Contact Us'
    });
});

app.get('/Reach', (req, res) => {
    res.render('Reach.hbs', {
        pageTitle: 'Reach Us'
    });
});

app.get('*', (req, res) => {
    res.send("<br><center><h1>OOPS!!! Something Wrong happened</h1><center>")
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});