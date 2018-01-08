
var LocalStrategy   = require('passport-local').Strategy;

var db = require('./database'),
	messages = db.messages,
	users = db.users,
	Friends = db.Friends,
	notifications=db.notifications;
  
module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


    passport.use('local-signup', new LocalStrategy({
      emailField : 'Email',
      usernameField : 'Username',
      passwordField : 'Password',
      passReqToCallback : true

    },
    function(req, email, password, done) {

        User.findOne({ 'username' :  req.body.Username }, function(err, user) {


            if (err)
                return done(err);


            if (user==null) {
Friendsid = Math.round((Math.random() * 100));
              User.insert({
                Email: req.body.Email,
             password: req.body.password,
             Invites : 0,
             batch   : Friendsid,
             Name1   :'',
             Name2   :'',
             Phonenumber:'',
             Verify  : 'false'
              });


            var user=req.body;
            return done(null, user);

            } else {

              return done(null, false, req.flash('signupMessage', 'User already exist'));

            }

        });

    }));


    passport.use('local-login', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

User.findOne({ 'username' :  req.body.email }, function(err, user) {

            if (err)
                return done(err);

               if(!user)
                return done(null, user)

            if (user.username !== email)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            if (user.password !== password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);


        });
        }

    ));

};
