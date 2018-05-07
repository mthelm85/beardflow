const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, User) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    console.log(req.body);
    process.nextTick(() => {
      User.findOne({
        'email': email
      }, (err, user) => {
        if (err) {
          return done(err);
        } else if (user) {
          return done(null, false, { message: 'That email is taken' });
        } else {
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save((err) => {
            if (err) {
              throw err;
            } else {
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    console.log(req.body);
    User.findOne({
      'email': email
    }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log('Invalid password');
        return done(null, false);
      }
      console.log('User was found');
      return done(null, user);
    });
  }));

};
