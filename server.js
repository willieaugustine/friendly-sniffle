const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const session = require('express-session');
  
  app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new LocalStrategy((username, password, done) => {
    // Replace this with proper user authentication
    if (username === 'user' && password === 'pass') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    // Replace this with proper user fetching
    done(null, { id: 1, username: 'user' });
  });
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
    