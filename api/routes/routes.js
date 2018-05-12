module.exports = (app, passport, Post, User) => {

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
    let query = { email: req.user.email };
    User.findOneAndUpdate(query, { $inc: { loginCounter: 1 } }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: 'yes' });
      }
    });
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
    User.findOne(query, null, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          userEmail: user.email,
          userLogins: user.loginCounter,
          profilePicUrl: user.profilePicUrl
         });
      }
    });
  });

  app.post('/api/account-setup', (req, res) => {
    console.log(req.body)
    let query = { email: req.body.userEmail };
    User.findOneAndUpdate(
      query,
      { $set: {
          userName: req.body.userName,
          profilePicUrl: req.body.profilePicUrl,
          userTitle: req.body.userTitle
        }
      }, (err, user) => {
        if (err) {
          res.json({ error: err })
        } else {
          res.json({ success: 'yes' })
        }
      }
    )
  })

  app.post('/api/post', (req, res) => {
    let newPost = new Post();
    newPost.title = req.body.title;
    newPost.text = req.body.text;
    newPost.user = req.body.user;
    newPost.save((err) => {
      if (err) {
        throw err;
      } else {
        return res.json({ success: 'yes' });
      }
    })
  });

  app.get('/api/get-posts', (req, res) => {
    let today = new Date();
    today.setMonth(today.getMonth() -1);
    Post.find({date: {$gt: today}}, null, {sort: '-date', limit: 10}, (err, posts) => {
      res.send(posts);
    });
  });

  app.get('/api/get-one-post', (req, res) => {
    console.log(req.query.id)
    Post.findById(req.query.id, (err, post) => {
      if (err) {
        res.send(err)
      } else {
        res.send(post)
      }
    })
  })

};
