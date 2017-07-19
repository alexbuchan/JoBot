/*jshint esversion: 6*/
module.exports = {
	setCurrentUser: function(req, res, next) {
	  if (req.session.passport) {
	    res.locals.currentUser = req.session.passport;
	    res.locals.isUserLoggedIn = true;
	  } else {
	  	// delete res.locals.currentUser;
	    res.locals.isUserLoggedIn = false;
	  }
	  next();
	},

	checkLoggedIn: function(message, route) {
	  return function(req, res, next) {
	    if (req.isAuthenticated()) {
	      return next();
	    } else {
	    	req.flash('error', message );
	      res.redirect(route);
	    }
	  };
	},
};
