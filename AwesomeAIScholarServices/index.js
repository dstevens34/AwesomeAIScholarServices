var express = require('express');
var db = require('./db');
var util = require('util');

var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var sessionIndex = -1; 

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new GoogleStrategy({

  clientID: '916115270200-ei1th7d00fi3ifj12ssdj6f85j127n1s.apps.googleusercontent.com',
  clientSecret: '4aX3BbW-p_E-dpT1AoW425hW',
  callbackURL: 'https://awesome-ai-scholar-services.herokuapp.com/auth/google/callback',

},
  function (token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function () {

      var user = profile._json;
      profile.refreshToken = refreshToken;
      profile.token = token;
      console.log(profile);
      db.addUser(user.id, '', user.given_name, user.family_name, user.email, '',
        function (err) {
          if (err)
            console.log(err);
          return done(null, profile);
        });
    });

  }));



var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));


app.get('/', function (request, response) {
  response.render('pages/index', { user: request.user });
});

app.get('/api/getCurrentUser', function (request, response) {
  response.json(request.user);
});


app.get('/api/getPapers', function (request, response) {
	
  var session = request.session;
  console.log('session : '+JSON.stringify(session));
	console.warn("This worked");
  var q = request.query.q;
  console.log('q : ' + q);
  if (q == null) {

    response.json('no query provided');
    return;
  } 

  var getPapers = function(){
    var tagArr = parseQueryForTags(q);
    // db.getPapers(tagArr, session.session_index, need to change back but this is for testing.
    db.getPapers(tagArr, session.session_index,
      function (err, rows) {
        if (err) {
          console.log(err)
          response.json(err);
        }
        else {
          response.json(rows);
        }
      });
  }

  var userID = request.user == null ? '-1' : request.user.id;
  if(session.session_index == null || session.query != q){
      db.addSession(userID, q,
    function (err) {
      if (err) {
        console.log(err)
        response.json(err);
      }
      else{
        db.getLastSession(userID,
        function (err, sessionRows) {
          if (err) {
            console.log(err)
            response.json(err);
          }
          else{
            //parse to get the session
            console.log(JSON.stringify(sessionRows));
            console.log('index : '+sessionRows[0].Index);
            session.query = q;
            session.session_index = sessionRows[0].Index;
            getPapers();
          }
      });
    }
  }
  );
  }
  else{
    getPapers();
  }

});


app.get('/api/upVote', function (request, response) {
  var session = request.session;
  console.log(JSON.stringify(session));
  var q = request.query.q;
  console.log('q : ' + q);
  if (q == null) {

    response.json('no query provided');
    return;
  }
	
	db.addPaperVote(session.session_index, q, 1, 
		function (err, rows) {
      if (err) {
        console.log(err)
        response.json(err);
      }
	  else {
		  var tagArr = parseQueryForTags(session.query);
		  // db.getPapers(tagArr, session.session_index, need to change back but this is for testing.
		  db.getPapers(tagArr, session.session_index,
			function (err, rows) {
			  if (err) {
				console.log(err)
				response.json(err);
			  }
			  else {
				response.json(rows);
			  }
			})
	  }
    });
});

app.get('/api/downVote', function (request, response) {
  var session = request.session;
  var q = request.query.q;
  console.log('q : ' + q);
  if (q == null) {

    response.json('no query provided');
    return;
  }
	
	db.addPaperVote(session.session_index, q, -1, 
		function (err, rows) {
      if (err) {
        console.log(err)
        response.json(err);
      }
	  else {
		  var tagArr = parseQueryForTags(session.query);
		  // db.getPapers(tagArr, session.session_index, need to change back but this is for testing.
		  db.getPapers(tagArr, session.session_index,
			function (err, rows) {
			  if (err) {
				console.log(err)
				response.json(err);
			  }
			  else {
				response.json(rows);
			  }
			})
	  }
    });
});

app.get('/api/savePaper', function (request, response) {
  var session = request.session;
  var q = request.query.q;
  console.log('q : ' + q);
  if (q == null) {

    response.json('no query provided');
    return;
  }
	
	db.addSavedPaper(session.session_index, q, 
		function (err, rows) {
      if (err) {
        console.log(err)
        response.json(err);
      }
	  else {
		  var tagArr = parseQueryForTags(session.query);
		  // db.getPapers(tagArr, session.session_index, need to change back but this is for testing.
		  db.getPapers(tagArr, session.session_index,
			function (err, rows) {
			  if (err) {
				console.log(err)
				response.json(err);
			  }
			  else {
				response.json(rows);
			  }
			})
	  }
    });
});

app.get('/api/getSavedPapers', function (request, response) {
  var userID = request.user == null ? '-1' : request.user.id;
  db.getSavedPapers(userID,
      function (err, rows) {
        if (err) {
          console.log(err)
          response.json(err);
        }
        else {
          response.json(rows);
        }
      });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

var parseQueryForTags = function (q) {
  return q.toLowerCase().trim().split(' ');
}

var parseQueryForTags = function (q) {
  return q.toLowerCase().trim().split(' ');
}