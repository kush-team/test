module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
  	var isDataEntry = false;
  	User.findOne(req.session.user.id).populate('roles').exec(function get(err, user) {
  		_.each(user.roles, function (role) {
			if (role.name === "data-entry") {
				isDataEntry = true;
			}
		});	
	  	if (isDataEntry) {
	    	return next();
	  	} else {
		  // User is not allowed
		  // (default res.forbidden() behavior can be overridden in `config/403.js`)
		  return res.forbidden('You are not permitted to perform this action.');
	  	}
  	});
  } else {
	  // User is not allowed
	  // (default res.forbidden() behavior can be overridden in `config/403.js`)
	  return res.forbidden('You are not permitted to perform this action.');

  }

};
