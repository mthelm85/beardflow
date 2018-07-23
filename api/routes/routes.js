module.exports = (app, cloudinary, passport, Post, User, Reply) => {

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

  app.post('/api/login', passport.authenticate('local-login', {}), (req, res) => {
      res.json({ success: 'yes' })
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
          userEmail: user.email,
          userLogins: user.loginCounter,
          userName: user.userName,
          userTitle: user.userTitle,
          profilePicUrl: user.profilePicUrl,
          keywords: user.keywords,
          favorites: user.favorites
         });
      }
    });
  });

  app.post('/api/account-setup', isLoggedIn, (req, res) => {
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
  });

  app.post('/api/post', isLoggedIn, (req, res) => {
    let newPost = new Post();
    newPost.title = req.body.title;
    newPost.text = req.body.text;
    newPost.user = req.body.user;
    newPost.userPic = req.body.userPic;
    newPost.keywords = req.body.keywords;
    newPost.category = req.body.category;
    newPost.imageUrls = req.body.imageUrls;
    newPost.save((err) => {
      if (err) {
        return res.json({ error: err });
        throw err;
      } else {
        return res.json({ success: 'yes' });
      }
    });
  });

  app.get('/api/get-posts', isLoggedIn, (req, res) => {
    let query = {}
    let options = {
      sort: { date: -1 },
      page: req.query.page,
      limit: 5
    }
    Post.paginate(query, options).then((err, posts) => {
      if (err) {
        res.send(err);
      } else {
        res.send(posts);
      }
    });
  });

  app.get('/api/get-posts-categorized', isLoggedIn, (req, res) => {
    let query = { category: req.query.category }
    let options = {
      sort: { date: -1 },
      page: req.query.page,
      limit: 5
    }
    Post.paginate(query, options).then((err, posts) => {
      if (err) {
        res.send(err);
      } else {
        res.send(posts);
      }
    });
  });

  app.get('/api/get-my-posts', isLoggedIn, (req, res) => {
    let query = { user: req.query.user }
    let options = {
      sort: { date: -1 },
      page: req.query.page,
      limit: 5
    }
    Post.paginate(query, options).then((err, posts) => {
      if (err) {
        res.send(err);
      } else {
        res.send(posts);
      }
    });
  });

  app.get('/api/get-one-post', isLoggedIn, (req, res) => {
    Post.findById(req.query.id, (err, post) => {
      if (err) {
        res.send(err)
      } else {
        res.send(post)
      }
    });
  });

  app.get('/api/get-replies', isLoggedIn, (req, res) => {
    Reply.find({ postObjectID: req.query.postObjectID }, null, {sort: '-date', limit: 5}, (err, replies) => {
      if (err) {
        res.send(err);
      } else {
        res.send(replies);
      }
    });
  });

  app.post('/api/reply', isLoggedIn, (req, res) => {
    let newReply = new Reply();
    newReply.postObjectID = req.body.postObjectID;
    newReply.user = req.body.user;
    newReply.userPic = req.body.userPic;
    newReply.text = req.body.text;
    newReply.save((err) => {
      if (err) {
        return res.json({ error: err });
        throw err;
      } else {
        return res.json({ success: 'yes' });
      }
    });
  });

  app.post('/api/delete-photo', isLoggedIn, (req, res) => {
      cloudinary.v2.api.delete_resources([req.body.folder + req.body.public_id], (error, result) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(result);
          res.send(result);
        }
      });
  });

  app.post('/api/like-post', isLoggedIn, (req, res) => {
    let query = { _id: req.body.id }
    Post.findOneAndUpdate(query, { $inc: { likes: 1 } }, (err, post) => {
      if (err) {
        res.send(err)
      } else {
        post.save();
      }
    });
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.send(err)
      } else if (user) {
        if (user.keywords.length > 999) {
          for (let i = 0; i < req.body.keywords.length; i++) {
            user.keywords.splice(0, 1, req.body.keywords[i])
          }
        } else {
          for (let i = 0; i < req.body.keywords.length; i++) {
            user.keywords.push(req.body.keywords[i])
          }
        }
        user.save();
      }
    });
  });

  app.post('/api/save-keywords', isLoggedIn, (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.send(err)
      } else if (user) {
        if (user.keywords.length > 99) {
          for (let i = 0; i < 3; i++) {
            user.keywords.splice(0, 1, req.body.keywords[i])
          }
        } else {
          for (let i = 0; i < 3; i++) {
            user.keywords.push(req.body.keywords[i])
          }
        }
        user.save();
      }
    });
  });

  app.post('/api/search-posts', isLoggedIn, (req, res) => {
    let query = { $text: { $search: req.body.searchTerm } }
    let projection = { score: { $meta: 'textScore' } }
    let options = {
      sort: { score: { $meta: 'textScore' } },
      limit: 50
    }
    Post.find(query, projection, options).then((err, posts) => {
      if (err) {
        res.send(err)
      } else if (posts) {
        res.send(posts)
      }
    })
  });

  app.post('/api/add-to-favs', isLoggedIn, (req, res) => {
    User.update({ email: req.body.email }, { $push: { favorites: [req.body.postId] } }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 'yes' })
      }
    })
  });

  app.post('/api/remove-fav', isLoggedIn, (req, res) => {
    User.update({ email: req.body.email }, { $pullAll: { favorites: [req.body.postId] } }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 'yes' })
      }
    })
  })

};
