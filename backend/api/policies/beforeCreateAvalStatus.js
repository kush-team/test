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

    req.body['avalStatus'].avalesNeed = req.body['avalStatus'].avalesNeed.replace('.', '');
    req.body['avalStatus'].avalesEntry = req.body['avalStatus'].avalesEntry.replace('.', '');

    AvalStatus.findOne().where({lineNumber: req.body['avalStatus']['lineNumber'], townName: req.body['avalStatus']['townName']}).exec(function (err, avalStatus) {
      if (avalStatus)
        AvalStatus.destroy(avalStatus.id).exec(function () {
          
        });
    });

    ElectoralLine.findOne().where({number: req.body['avalStatus']['lineNumber']}).exec( function (err, instance) {
      Town.findOne().where({slug: req.body['avalStatus']['townName'] }).exec( function (err, town) {
        ElectoralSection.findOne().where({number: req.body['avalStatus']['sectionNumber'], province: 6}).exec( function (err, electoralSection) {
          req.body['avalStatus'].line = instance.id;
          if (town)
            req.body['avalStatus'].town = town.id;
          else
            console.log(req.body['avalStatus']['townName'] + " Not found");
          req.body['avalStatus'].electoralSection = electoralSection.id;
          next();
        });
       });
    });    
  } else {
    next();
  }
 };