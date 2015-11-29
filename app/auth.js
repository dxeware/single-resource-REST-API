"use strict";

function ensureAuthenticated(req, res, next) {
  if (process.env.TEST === 'test') {
    return next();
  } else {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
  }
}

module.exports = ensureAuthenticated;