module.exports = (app, passport, User) => {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({ authorized: 'no' });
    }
  };

  app.post('/api/signup', passport.authenticate('local-signup', {}), (req, res) => {
      res.json({ success: 'yes' })
  });

  app.get('/api/signup-error', (req, res) => {
    res.json({ error: 'Could not sign you up' });
  });

  app.post('/api/login', passport.authenticate('local-login', {}), (req, res) => {
    res.json({ success: 'yes' });
  });

  app.get('/api/login-error', (req, res) => {
    res.json({ error: 'Could not log you in' });
  });

  app.get('/api/auth', isLoggedIn, (req, res) => {
    res.json({ authorized: 'yes' });
  });

  app.get('/api/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.json({ success: 'yes' });
  });

  app.get('/api/account', isLoggedIn, (req, res) => {
    let query = { email: req.user.email };
    User.findOneAndUpdate(query, { $inc: { loginCounter: 1 } }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          userName: user.name,
          userEmail: user.email,
          memberSince: user.memberSince
         });
      }
    });
  });

};
