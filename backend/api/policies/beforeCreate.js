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
    if ( req.session.user.id ) {
      sails.log.debug( 'Policy beforeCreate: Injecting req.user.id into "' + Model.identity + '" parameters.' );
      req.body[ Model.identity ].owner = req.session.user.id;
    } else {
      // exception for creating new users, otherwise any creative act needs a logged in user
      if ( Model.identity !== 'user' ) return res.forbidden( "Create blueprint needs an authenticated user!" );
    }
  }
 
  next();
 
};