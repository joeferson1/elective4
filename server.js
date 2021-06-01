const express = require('express')
const app = express()
const mongoose = require('mongoose');
const request = require('request');
const path = require('path');
const Person = require('./models/persons');
var img =""
const dbURI = 'mongodb+srv://test123:test123@cluster0.izqog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));
 app.use('/img', express.static(__dirname + '/Images'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine' , 'ejs')
function timeanddate(objects)
    {
        var timeFormat = 
        {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: objects["timezone"]
        }

        var dateFormat = 
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: objects["timezone"]
        }

        var datetime = new Date(objects["datetime"])
        
        var date = new Intl.DateTimeFormat('en-US', dateFormat).format(datetime)
        var time = new Intl.DateTimeFormat('en-US', timeFormat).format(datetime)

        return [time, date];

    }
function splitStr(str){
    var string = str.split('/')[1];
    return string;
}
console.dir
(
    app.locals.date // = > date
)
console.dir
(
    app.locals.nationality // = > nationality
)
console.dir
(
    app.locals.search // = > locate
)
app.get('/datalist', (req, res) => {
    request('http://worldtimeapi.org/api/timezone/'+search.Place, function(error, response, body) {
      if (search.Place == "Africa/Accra")
        {
          nationality = 'African';
          img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1200px-Flag_of_South_Africa.svg.png"
        }
    else if(search.Place == "Asia/Manila")
        {
          nationality = 'Filipino';
          img ="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/1200px-Flag_of_the_Philippines.svg.png"
        }
    else if(search.Place == "Asia/Singapore")
        { 
          nationality = 'Singaporean';
          img = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png"

        }
    else if (search.Place == "Asia/Dubai")
        {
            nationality = 'Emirates';
            img = "https://images-na.ssl-images-amazon.com/images/I/413YBG3WHML._AC_.jpg"
        }
    else if (search.Place == 'America/Puerto_Rico')
        {
            nationality = 'Puertorriqueños';
            img = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_Puerto_Rico_%28Light_blue%29.svg/1280px-Flag_of_Puerto_Rico_%28Light_blue%29.svg.png"
        }
        console.log(search.Place=="Africa/Accra")
        const info = JSON.parse(body)
        information = timeanddate(info)
        Person.find({"nationality":nationality})
            .then((result) => {
                res.render('datalist', {title: 'Data List', time: information[0], date: information[1], img: img, persons: result})
            })
            .catch((err) => {
                console.log(err);
            })
    })
    console.log(search.Place)
});
app.post('/append', (req, res) => {
    const person = new Person(req.body);
    console.log(req.body);
    person.save()
        .then((result) => {
            res.redirect('/datalist');
        })
        .catch((err) => {
            console.log(err);
        })
});
app.get('/newdata', function(req, res) {
    if (search.Place == "Africa/Accra")
        {
            nationality = 'African';
            
        }
    else if(search.Place == "Asia/Manila")
        {
            nationality = 'Filipino';
        }
    else if(search.Place == "Asia/Singapore")
        {
            nationality = 'Singaporean';
        }
    else if (search.Place == "Asia/Dubai")
        {
            nationality = 'Emirates';
        }
    else if (search.Place == 'America/Puerto_Rico')
        {
            nationality = 'Puertorriqueños';
        }
    
    res.render("newdata", {title: 'Add New Person', nationality: nationality});
});
app.get('/viewdata/:id', (req, res) => {
    const person_id = req.params.id;
    console.log(person_id)
    Person.findById(person_id)
    .then(result => {
        console.log(result);
        res.render('viewdata', {title: 'View Person', preview: result});
    }).catch(err => {
        console.log(err);
    })
});
app.post('/lookup', (req, res) => {
    res.render('viewdata');
});
app.get('/', function(req, res) {   
    res.render('', {title: 'Home'})
});
app.post('/datalist', (req, res) => {
  
    search = req.body
    res.redirect('datalist')    
});
app.use((req, res) => {
    res.render('404', {title: 'Error'})
});

