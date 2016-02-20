/**
 * beforeCreate
 *
 * @module      :: Policy
 * @description :: Simple policy to inject the user creating a record into the records values.
 *                 Assumes req.user && req.user.id to be set when a user is logged in.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 
var actionUtil = require( 'sails/lib/hooks/blueprints/actionUtil' );
 
module.exports = function ( req, res, next ) {
  var blueprint = req.options.action;
 
  if ( blueprint === 'create' ) {
    var Model = actionUtil.parseModel( req );
    ElectoralLine.findOne().where({number: req.body[ Model.identity ]['lineNumber']}).exec( function updated(err, instance) {
      if (err)
        next();
      if (!instance)
        next();
      req.body[ Model.identity ].line = instance.id;
      next();
    });    
  } else {
    next();
  }
 };